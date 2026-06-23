import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useStockData } from '../../hooks/useStockData';
import { useStockPreviews } from '../../hooks/useStockPreviews';
import type { FinnhubSearchResult } from '../../services/finnhub/types';
import type { StockData } from '../../types/stock';

export interface StockSearchFlow {
  debouncedQuery: string;
  error: string;
  loadingSymbol: string;
  onQueryChange: (query: string) => void;
  onSelect: (result: FinnhubSearchResult) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
  previewResults: FinnhubSearchResult[];
  query: string;
  showPreviews: boolean;
  stockData: StockData | null;
}

export function useStockSearchFlow(): StockSearchFlow {
  const [query, setQuery] = useState('');
  const [showPreviews, setShowPreviews] = useState(false);
  const { results } = useStockPreviews(query);
  const { stockData, error, loadingSymbol, loadStockData } = useStockData();
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    setShowPreviews(debouncedQuery.length >= 2);
  }, [debouncedQuery]);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setShowPreviews(false);
    await loadStockData(query);
  }

  function handleSelect(result: FinnhubSearchResult): void {
    setShowPreviews(false);
    void loadStockData(result);
  }

  return {
    debouncedQuery,
    error,
    loadingSymbol,
    onQueryChange: setQuery,
    onSelect: handleSelect,
    onSubmit: handleSubmit,
    previewResults: results,
    query,
    showPreviews,
    stockData,
  };
}
