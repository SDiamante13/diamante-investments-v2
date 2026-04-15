import type { StockData } from '../../types/stock.ts';
import type { FinnhubMetricResponse, FinnhubProfile, FinnhubQuote, FinnhubSearchResponse, FinnhubSearchResult } from './types.ts';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export async function searchStock(query: string): Promise<FinnhubSearchResult[]> {
  const response = await fetch(`${BASE_URL}/search?q=${query}&exchange=US&token=${API_KEY}`);
  const data = (await response.json()) as FinnhubSearchResponse;
  return data.result || [];
}

export async function getQuote(symbol: string): Promise<FinnhubQuote> {
  const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as FinnhubQuote;
}

export async function getProfile(symbol: string): Promise<FinnhubProfile> {
  const response = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as FinnhubProfile;
}

export async function getMetrics(symbol: string): Promise<FinnhubMetricResponse> {
  const response = await fetch(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
  return (await response.json()) as FinnhubMetricResponse;
}

export async function getStockData(symbol: string): Promise<StockData | null> {
  const normalizedSymbol = symbol.trim().toUpperCase();
  const searchResults = await searchStock(normalizedSymbol);

  const stockInfo = searchResults[0];
  if (!stockInfo) {
    return null;
  }

  const [quoteResult, profileResult, metricsResult] = await Promise.allSettled([
    getQuote(normalizedSymbol),
    getProfile(normalizedSymbol),
    getMetrics(normalizedSymbol),
  ]);

  if (quoteResult.status === 'rejected') {
    return null;
  }

  const quote = quoteResult.value;
  const profile = profileResult.status === 'fulfilled' ? profileResult.value : null;
  const metrics = metricsResult.status === 'fulfilled' ? metricsResult.value.metric : null;

  return {
    symbol: stockInfo.symbol,
    companyName: profile?.name ?? stockInfo.description,
    currentPrice: quote.c,
    dollarChange: quote.d,
    percentChange: quote.dp,
    open: quote.o,
    high: quote.h,
    low: quote.l,
    marketCap: profile?.marketCapitalization,
    peRatio: metrics?.peBasicExclExtraTTM,
    weekHigh52: metrics?.['52WeekHigh'],
    weekLow52: metrics?.['52WeekLow'],
  };
}
