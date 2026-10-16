import type { SearchHistoryEntry } from '../types/searchHistory';
import type { StockData } from '../types/stock';

export interface SearchHistory {
  entries: SearchHistoryEntry[];
  record: (stock: StockData) => void;
}

export function useSearchHistory(): SearchHistory {
  return { entries: [], record: (): void => undefined };
}
