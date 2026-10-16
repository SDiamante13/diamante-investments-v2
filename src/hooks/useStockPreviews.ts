import { useState, useEffect } from 'react';
import { searchStock } from '../services/finnhub/finnhub.ts';
import { MIN_PREVIEW_QUERY_LENGTH } from '../utils/previewQuery';
import { useDebounce } from './useDebounce';
import { FinnhubSearchResult } from '../services/finnhub/types.ts';

export function useStockPreviews(query: string): {
  results: FinnhubSearchResult[];
} {
  const [results, setResults] = useState<FinnhubSearchResult[]>([]);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    async function fetchPreviews(): Promise<void> {
      if (debouncedQuery.length >= MIN_PREVIEW_QUERY_LENGTH) {
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
