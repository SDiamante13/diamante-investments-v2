import type { StockData } from '../../types/stock.ts';
import { FinnhubQuote, FinnhubSearchResponse, FinnhubSearchResult, FinnhubProfile2, FinnhubMetrics } from './types.ts';

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

export async function getProfile(symbol: string): Promise<FinnhubProfile2> {
  const response = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as Promise<FinnhubProfile2>;
}

export async function getMetrics(symbol: string): Promise<FinnhubMetrics> {
  const response = await fetch(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
  return (await response.json()) as Promise<FinnhubMetrics>;
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

  return {
    symbol: stockInfo.symbol,
    companyName: stockInfo.description,
    quote: {
      currentPrice: quote.c,
      dollarChange: quote.d,
      percentChange: quote.dp,
      open: quote.o,
      high: quote.h,
      low: quote.l,
    },
    profile: {
      marketCap: profile.marketCapitalization,
    },
    metrics: {
      peRatio: metrics.metric.peBasicExclExtraTTM,
      yearHigh: metrics.metric['52WeekHigh'],
      yearLow: metrics.metric['52WeekLow'],
    },
  };
}
