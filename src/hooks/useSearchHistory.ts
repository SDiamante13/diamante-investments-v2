import type { SearchHistoryEntry } from '../types/searchHistory';
import { isRecord } from '../utils/guards';
import { usePersistedList } from './usePersistedList';

const STORAGE_KEY = 'diamante.searchHistory.v1';

function isSearchHistoryEntry(value: unknown): value is SearchHistoryEntry {
  return isRecord(value) && typeof value.symbol === 'string' && typeof value.companyName === 'string';
}

export function useSearchHistory(): { entries: SearchHistoryEntry[] } {
  const [entries] = usePersistedList<SearchHistoryEntry>(STORAGE_KEY, isSearchHistoryEntry);

  return { entries };
}
