import type { FinnhubSearchResult, FinnhubQuote, StockData, FinnhubSearchResponse } from '../types/stock';
import { normalizeTickerSymbol } from '../utils/stock';

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

export async function getStockData(symbol: string): Promise<StockData | null> {
  const normalizedSymbol = normalizeTickerSymbol(symbol);
  const [searchResults, quote] = await Promise.all([searchStock(normalizedSymbol), getQuote(normalizedSymbol)]);

  const stockInfo = searchResults[0];
  if (!stockInfo) {
    return null;
  }

  return {
    symbol: stockInfo.symbol,
    companyName: stockInfo.description,
    currentPrice: quote.c,
    dollarChange: quote.d,
    percentChange: quote.dp,
  };
}
