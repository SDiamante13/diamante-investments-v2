import { SearchResponse, Quote, StockData } from '../types/finnhub';

const API_KEY: string = import.meta.env.VITE_FINNHUB_API_KEY || '';
const BASE_URL = 'https://finnhub.io/api/v1';

export async function searchStock(symbol: string): Promise<SearchResponse> {
  const response = await window.fetch(`${BASE_URL}/search?q=${symbol}&token=${API_KEY}`);
  return (await response.json()) as SearchResponse;
}

export async function getQuote(symbol: string): Promise<Quote> {
  const response = await window.fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
  return (await response.json()) as Quote;
}

export async function getStockData(symbol: string): Promise<StockData | null> {
  const searchResponse = await searchStock(symbol);
  if (!searchResponse.result || searchResponse.result.length === 0) {
    return null;
  }

  const stock = searchResponse.result[0];
  const quote = await getQuote(stock.symbol);

  return {
    symbol: stock.symbol,
    companyName: stock.description,
    currentPrice: quote.c,
    change: quote.d,
    percentChange: quote.dp,
  };
}
