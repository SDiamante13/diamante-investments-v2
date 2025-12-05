import type { StockData } from '../../types/stock.ts';
import { FinnhubQuote, FinnhubSearchResponse, FinnhubSearchResult, FinnhubProfile2, FinnhubMetric, FinnhubCandle } from './types.ts';

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

export async function getProfile2(symbol: string): Promise<FinnhubProfile2> {
  const response = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as FinnhubProfile2;
}

export async function getMetric(symbol: string): Promise<FinnhubMetric> {
  const response = await fetch(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
  return (await response.json()) as FinnhubMetric;
}

export async function getCandle(symbol: string, from: number, to: number): Promise<FinnhubCandle> {
  const response = await fetch(`${BASE_URL}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${API_KEY}`);
  return (await response.json()) as FinnhubCandle;
}

async function fetchAdditionalMetrics(symbol: string): Promise<{
  profile2: FinnhubProfile2 | null;
  metric: FinnhubMetric | null;
  candle: FinnhubCandle | null;
}> {
  let profile2: FinnhubProfile2 | null = null;
  let metric: FinnhubMetric | null = null;
  let candle: FinnhubCandle | null = null;

  try {
    profile2 = await getProfile2(symbol);
  } catch (_e) {
    profile2 = null;
  }

  try {
    metric = await getMetric(symbol);
  } catch (_e) {
    metric = null;
  }

  try {
    const today = Math.floor(Date.now() / 1000);
    const todayStart = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
    candle = await getCandle(symbol, todayStart, today);
  } catch (_e) {
    candle = null;
  }

  return { profile2, metric, candle };
}

export async function getStockData(symbol: string): Promise<StockData | null> {
  const normalizedSymbol = symbol.trim().toUpperCase();
  const searchResults = await searchStock(normalizedSymbol);

  const stockInfo = searchResults[0];
  if (!stockInfo) {
    return null;
  }

  const quote = await getQuote(normalizedSymbol);
  const { profile2, metric, candle } = await fetchAdditionalMetrics(normalizedSymbol);

  return {
    symbol: stockInfo.symbol,
    companyName: stockInfo.description,
    currentPrice: quote.c,
    dollarChange: quote.d,
    percentChange: quote.dp,
    openPrice: quote.o,
    high: quote.h,
    low: quote.l,
    volume: candle?.v?.[candle.v.length - 1] ?? null,
    marketCap: profile2?.marketCapitalization ?? null,
    peRatio: metric?.metric?.peBasicExclExtraTTM ?? null,
    weekHigh52: metric?.metric?.['52WeekHigh'] ?? null,
    weekLow52: metric?.metric?.['52WeekLow'] ?? null,
  };
}
