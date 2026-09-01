import type { SearchHistoryEntry } from '../types/searchHistory';
import { isRecord } from '../utils/guards';
import { recordSearch } from '../utils/searchHistory';
import { usePersistedList } from './usePersistedList';

const STORAGE_KEY = 'diamante.searchHistory.v1';
const HISTORY_LIMIT = 5;

function isSearchHistoryEntry(value: unknown): value is SearchHistoryEntry {
  return isRecord(value) && typeof value.symbol === 'string' && typeof value.companyName === 'string';
}

export function useSearchHistory(): {
  entries: SearchHistoryEntry[];
  record: (entry: SearchHistoryEntry) => void;
} {
  const [entries, setEntries] = usePersistedList<SearchHistoryEntry>(STORAGE_KEY, isSearchHistoryEntry);

  return {
    entries,
    record: (entry) => setEntries((current) => recordSearch(current, entry, HISTORY_LIMIT)),
  };
}
