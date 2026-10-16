import type { SearchHistoryEntry } from '../types/searchHistory';
import { normalizeSymbol } from './symbols';

export function recordSearch(entries: SearchHistoryEntry[], entry: SearchHistoryEntry): SearchHistoryEntry[] {
  const symbol = normalizeSymbol(entry.symbol);
  const rest = entries.filter((existing) => normalizeSymbol(existing.symbol) !== symbol);
  return [{ ...entry, symbol }, ...rest];
}
