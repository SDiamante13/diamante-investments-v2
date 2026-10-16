import { useEffect } from 'react';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import type { SearchHistoryEntry } from '../../types/searchHistory';
import type { StockData } from '../../types/stock';

export function useRecordedSearchHistory(stockData: StockData | null): SearchHistoryEntry[] {
  const { entries, record } = useSearchHistory();

  useEffect(() => {
    if (stockData) record(stockData);
  }, [stockData, record]);

  return entries;
}
