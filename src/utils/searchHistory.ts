import type { SearchHistoryEntry } from '../types/searchHistory';

export function recordSearch(entries: SearchHistoryEntry[], entry: SearchHistoryEntry): SearchHistoryEntry[] {
  return [entry, ...entries.filter((existing) => existing.symbol !== entry.symbol)];
}
