import type { SearchHistoryEntry } from '../types/searchHistory';

export function useSearchHistory(): { entries: SearchHistoryEntry[] } {
  return { entries: [] };
}
