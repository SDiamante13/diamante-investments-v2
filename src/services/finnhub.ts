import type { FinnhubSearchResult, FinnhubQuote, StockData } from '../types/stock';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export async function searchStock(query: string): Promise<FinnhubSearchResult[]> {
  const response = await fetch(`${BASE_URL}/search?q=${query}&token=${API_KEY}`);
  const data = await response.json();
  return data.result || [];
}

export async function getQuote(symbol: string): Promise<FinnhubQuote> {
  const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
  return response.json();
}

export async function getStockData(symbol: string): Promise<StockData | null> {
  const [searchResults, quote] = await Promise.all([
    searchStock(symbol),
    getQuote(symbol),
  ]);

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
