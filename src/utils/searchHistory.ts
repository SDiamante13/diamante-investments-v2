import type { SearchHistoryEntry } from '../types/searchHistory';
import { normalizeSymbol } from './symbols';

export function recordSearch(entries: SearchHistoryEntry[], entry: SearchHistoryEntry): SearchHistoryEntry[] {
  const newest = { ...entry, symbol: normalizeSymbol(entry.symbol) };
  return [newest, ...entries.filter((existing) => normalizeSymbol(existing.symbol) !== newest.symbol)];
}
