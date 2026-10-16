import { useCallback } from 'react';
import type { SearchHistoryEntry } from '../types/searchHistory';
import type { StockData } from '../types/stock';
import { isSearchHistoryEntry, recordSearch, toSearchHistoryEntry } from '../utils/searchHistory';
import { parseStoredItems } from '../utils/storage';
import { useLocalStorageState } from './useLocalStorageState';

const STORAGE_KEY = 'diamante.searchHistory.v1';

export interface SearchHistory {
  entries: SearchHistoryEntry[];
  record: (stock: StockData) => void;
}

interface SearchHistoryState {
  items: SearchHistoryEntry[];
}

function parseSearchHistoryState(raw: string | null): SearchHistoryState {
  return { items: parseStoredItems(raw, isSearchHistoryEntry) };
}

export function useSearchHistory(): SearchHistory {
  const [state, setState] = useLocalStorageState(STORAGE_KEY, parseSearchHistoryState);

  const record = useCallback(
    (stock: StockData): void => {
      setState((current) => ({ items: recordSearch(current.items, toSearchHistoryEntry(stock)) }));
    },
    [setState]
  );

  return { entries: state.items, record };
}
