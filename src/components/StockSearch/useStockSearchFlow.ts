import type { FormEvent } from 'react';
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useStockPreviews } from '../../hooks/useStockPreviews';
import type { FinnhubSearchResult } from '../../services/finnhub/types';
import type { StockData } from '../../types/stock';
import type { StockListRow } from '../../types/stockListRow';
import { toStockListRow } from '../../utils/searchHistory';
import { useRecordedSearch } from './useRecordedSearch';

export interface StockSearchFlow {
  error: string;
  loadingSymbol: string;
  onBlur: () => void;
  onFocus: () => void;
  onQueryChange: (query: string) => void;
  onSelect: (result: FinnhubSearchResult) => void;
  onSelectRecent: (row: StockListRow) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
  previewResults: FinnhubSearchResult[];
  query: string;
  recentRows: StockListRow[];
  showMatches: boolean;
  stockData: StockData | null;
}

export function useStockSearchFlow(): StockSearchFlow {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suppressedQuery, setSuppressedQuery] = useState('');
  const { results } = useStockPreviews(query);
  const { stockData, error, loadingSymbol, recentEntries, search } = useRecordedSearch();
  const debouncedQuery = useDebounce(query, 400);

  function runSearch(stock: string | FinnhubSearchResult): void {
    setIsOpen(false);
    void search(stock);
  }

  function handleSelectRecent(row: StockListRow): void {
    setQuery(row.symbol);
    setSuppressedQuery(row.symbol);
    runSearch(row.symbol);
  }

  return {
    error,
    loadingSymbol,
    onBlur: () => setIsOpen(false),
    onFocus: () => setIsOpen(true),
    onQueryChange: (nextQuery): void => {
      setQuery(nextQuery);
      setIsOpen(true);
    },
    onSelect: runSearch,
    onSelectRecent: handleSelectRecent,
    onSubmit: async (e): Promise<void> => {
      e.preventDefault();
      runSearch(query);
    },
    previewResults: results,
    query,
    recentRows: isOpen ? recentEntries.map(toStockListRow) : [],
    showMatches: isOpen && debouncedQuery.length >= 2 && debouncedQuery !== suppressedQuery,
    stockData,
  };
}
