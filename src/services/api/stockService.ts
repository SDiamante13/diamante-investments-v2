import { fetchFinnhub } from './finnhubClient';
import type { SearchResponse, Quote } from '../../types/stock';

export async function searchStock(query: string): Promise<SearchResponse> {
  const response = await fetchFinnhub(`/search?q=${query}`);
  return response.json() as Promise<SearchResponse>;
}

export async function getQuote(symbol: string): Promise<Quote> {
  const response = await fetchFinnhub(`/quote?symbol=${symbol}`);
  return response.json() as Promise<Quote>;
}
