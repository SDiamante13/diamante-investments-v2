import type { StockData } from '../../types/stock.ts';
import { isPositiveFiniteNumber } from '../../utils/numbers.ts';
import type { FinnhubMetrics, FinnhubProfile, FinnhubQuote, FinnhubSearchResponse, FinnhubSearchResult } from './types.ts';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

type StockResponses = [PromiseSettledResult<FinnhubQuote>, PromiseSettledResult<FinnhubProfile>, PromiseSettledResult<FinnhubMetrics>];

export async function searchStock(query: string): Promise<FinnhubSearchResult[]> {
  const response = await fetch(`${BASE_URL}/search?q=${query}&exchange=US&token=${API_KEY}`);
  const data = (await response.json()) as FinnhubSearchResponse;
  return data.result || [];
}

export async function getQuote(symbol: string): Promise<FinnhubQuote> {
  const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as Promise<FinnhubQuote>;
}

export async function getProfile(symbol: string): Promise<FinnhubProfile> {
  const response = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as FinnhubProfile;
}

export async function getMetrics(symbol: string): Promise<FinnhubMetrics> {
  const response = await fetch(`${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${API_KEY}`);
  return (await response.json()) as FinnhubMetrics;
}

function settledValue<T>(result: PromiseSettledResult<T>): T | null {
  return result.status === 'fulfilled' ? result.value : null;
}

function positiveValue(...values: Array<number | undefined>): number | null {
  return values.find(isPositiveFiniteNumber) ?? null;
}

function marketCapInDollars(profile: FinnhubProfile | null): number | undefined {
  return profile?.marketCapitalization === undefined ? undefined : profile.marketCapitalization * 1_000_000;
}

async function resolveStockInfo(stock: string | FinnhubSearchResult): Promise<FinnhubSearchResult | null> {
  if (typeof stock !== 'string') return stock;
  const searchResults = await searchStock(stock.trim().toUpperCase());
  return searchResults[0] ?? null;
}

async function fetchStockResponses(symbol: string): Promise<StockResponses> {
  return Promise.allSettled([getQuote(symbol), getProfile(symbol), getMetrics(symbol)]);
}

function requiredValue<T>(result: PromiseSettledResult<T>): T {
  if (result.status === 'rejected') throw result.reason;
  return result.value;
}

function mapStockData(stock: FinnhubSearchResult, responses: StockResponses): StockData {
  const [quoteResult, profileResult, metricsResult] = responses;
  const quote = requiredValue(quoteResult);
  const profile = settledValue(profileResult);
  const metrics = settledValue(metricsResult)?.metric;
  return {
    symbol: stock.symbol,
    companyName: stock.description,
    currentPrice: quote.c,
    dollarChange: quote.d,
    percentChange: quote.dp,
    openPrice: positiveValue(quote.o),
    dayHigh: positiveValue(quote.h),
    dayLow: positiveValue(quote.l),
    marketCap: positiveValue(marketCapInDollars(profile)),
    peRatio: positiveValue(metrics?.peBasicExclExtraTTM, metrics?.peNormalizedAnnual),
    yearHigh: positiveValue(metrics?.['52WeekHigh']),
    yearLow: positiveValue(metrics?.['52WeekLow']),
  };
}

export async function getStockData(stock: string | FinnhubSearchResult): Promise<StockData | null> {
  const stockInfo = await resolveStockInfo(stock);
  if (!stockInfo) return null;
  const normalizedSymbol = stockInfo.symbol.trim().toUpperCase();
  const responses = await fetchStockResponses(normalizedSymbol);
  return mapStockData(stockInfo, responses);
}
