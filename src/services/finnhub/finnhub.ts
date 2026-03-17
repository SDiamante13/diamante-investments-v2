import type { StockData } from '../../types/stock.ts';
import type { FinnhubQuote, FinnhubSearchResponse, FinnhubSearchResult, FinnhubProfile, FinnhubMetricsResponse } from './types.ts';

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

export async function getCompanyProfile(symbol: string): Promise<FinnhubProfile | null> {
  const response = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as FinnhubProfile;
}

export async function getBasicFinancials(symbol: string): Promise<FinnhubMetricsResponse | null> {
  const response = await fetch(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
  return (await response.json()) as FinnhubMetricsResponse;
}

export async function getStockData(symbol: string): Promise<StockData | null> {
  const normalizedSymbol = symbol.trim().toUpperCase();
  const searchResults = await searchStock(normalizedSymbol);

  const stockInfo = searchResults[0];
  if (!stockInfo) {
    return null;
  }

  const [quote, profile, financials] = await Promise.all([
    getQuote(normalizedSymbol),
    getCompanyProfile(normalizedSymbol).catch(() => null),
    getBasicFinancials(normalizedSymbol).catch(() => null),
  ]);

  return {
    symbol: stockInfo.symbol,
    companyName: stockInfo.description,
    currentPrice: quote.c,
    dollarChange: quote.d,
    percentChange: quote.dp,
    open: quote.o,
    high: quote.h,
    low: quote.l,
    marketCap: profile?.marketCapitalization ?? null,
    peRatio: financials?.metric?.peBasicExclExtraTTM ?? null,
    fiftyTwoWeekHigh: financials?.metric?.['52WeekHigh'] ?? null,
    fiftyTwoWeekLow: financials?.metric?.['52WeekLow'] ?? null,
  };
}
