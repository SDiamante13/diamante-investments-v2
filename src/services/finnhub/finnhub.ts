import type { StockData } from '../../types/stock.ts';
import type { FinnhubQuote, FinnhubSearchResponse, FinnhubSearchResult, FinnhubProfile, FinnhubMetricResponse } from './types.ts';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export async function searchStock(query: string): Promise<FinnhubSearchResult[]> {
  const response = await fetch(`${BASE_URL}/search?q=${query}&exchange=US&token=${API_KEY}`);
  const data = (await response.json()) as FinnhubSearchResponse;
  return data.result || [];
}

export async function getQuote(symbol: string): Promise<FinnhubQuote> {
  const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as Promise<FinnhubQuote>;
}

async function getProfile(symbol: string): Promise<FinnhubProfile | null> {
  try {
    const response = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
    return (await response.json()) as FinnhubProfile;
  } catch {
    return null;
  }
}

async function getMetrics(symbol: string): Promise<FinnhubMetricResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
    return (await response.json()) as FinnhubMetricResponse;
  } catch {
    return null;
  }
}

export async function getStockData(symbol: string): Promise<StockData | null> {
  const normalizedSymbol = symbol.trim().toUpperCase();
  const searchResults = await searchStock(normalizedSymbol);

  const stockInfo = searchResults[0];
  if (!stockInfo) {
    return null;
  }

  const [quote, profile, metrics] = await Promise.all([
    getQuote(normalizedSymbol),
    getProfile(normalizedSymbol),
    getMetrics(normalizedSymbol),
  ]);

  return mapToStockData(stockInfo, quote, profile, metrics);
}

function mapToStockData(
  stockInfo: FinnhubSearchResult,
  quote: FinnhubQuote,
  profile: FinnhubProfile | null,
  metrics: FinnhubMetricResponse | null
): StockData {
  return {
    symbol: stockInfo.symbol,
    companyName: stockInfo.description,
    currentPrice: quote.c,
    dollarChange: quote.d,
    percentChange: quote.dp,
    open: quote.o ?? null,
    high: quote.h ?? null,
    low: quote.l ?? null,
    marketCap: profile?.marketCapitalization ?? null,
    peRatio: metrics?.metric?.peBasicExclExtraTTM ?? null,
    week52High: metrics?.metric?.['52WeekHigh'] ?? null,
    week52Low: metrics?.metric?.['52WeekLow'] ?? null,
  };
}
