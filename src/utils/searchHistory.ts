import type { SearchHistoryEntry } from '../types/searchHistory';
import { normalizeSymbol } from './symbols';

export function recordSearch(entries: SearchHistoryEntry[], entry: SearchHistoryEntry, limit: number): SearchHistoryEntry[] {
  const newest = { ...entry, symbol: normalizeSymbol(entry.symbol) };
  const older = entries.filter((existing) => normalizeSymbol(existing.symbol) !== newest.symbol);
  return [newest, ...older].slice(0, limit);
}
