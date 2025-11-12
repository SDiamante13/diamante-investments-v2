import { fetchFinnhub } from './finnhubClient';
import type { SearchResponse, Quote } from '../../types/api';

export async function searchStock(query: string): Promise<SearchResponse> {
  const response = await fetchFinnhub(`/search?q=${query}`);
  return (await response.json()) as SearchResponse;
}

export async function getQuote(symbol: string): Promise<Quote> {
  const response = await fetchFinnhub(`/quote?symbol=${symbol}`);
  if (response.status === 403) {
    throw new Error('Access forbidden');
  }
  return (await response.json()) as Quote;
}
