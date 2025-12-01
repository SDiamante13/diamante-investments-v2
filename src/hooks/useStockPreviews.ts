import { useState, useEffect } from 'react';
import { searchStock } from '../services/finnhub';
import type { FinnhubSearchResult } from '../types/stock';
import { useDebounce } from './useDebounce';

export function useStockPreviews(query: string): {
  results: FinnhubSearchResult[];
  showPreviews: boolean;
} {
  const [results, setResults] = useState<FinnhubSearchResult[]>([]);
  const [showPreviews, setShowPreviews] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    async function fetchPreviews(): Promise<void> {
      if (debouncedQuery.length >= 2) {
        const searchResults = await searchStock(debouncedQuery);
        setResults(searchResults);
        setShowPreviews(true);
      } else {
        setResults([]);
        setShowPreviews(false);
      }
    }
    void fetchPreviews();
  }, [debouncedQuery]);

  return { results, showPreviews };
}
