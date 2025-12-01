import { useState, useEffect } from 'react';
import { searchStock } from '../services/finnhub';
import type { FinnhubSearchResult } from '../types/stock';
import { useDebounce } from './useDebounce';

export function useStockPreviews(query: string): {
  results: FinnhubSearchResult[];
} {
  const [results, setResults] = useState<FinnhubSearchResult[]>([]);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    async function fetchPreviews(): Promise<void> {
      if (debouncedQuery.length >= 2) {
        const searchResults = await searchStock(debouncedQuery);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }
    void fetchPreviews();
  }, [debouncedQuery]);

  return { results };
}
