import type { SearchHistoryEntry } from '../types/searchHistory';
import type { StockData } from '../types/stock';
import { isRecord } from './storage';
import { normalizeSymbol } from './symbols';

export const SEARCH_HISTORY_LIMIT = 5;

export function recordSearch(entries: SearchHistoryEntry[], entry: SearchHistoryEntry): SearchHistoryEntry[] {
  const symbol = normalizeSymbol(entry.symbol);
  const rest = entries.filter((existing) => normalizeSymbol(existing.symbol) !== symbol);
  return [{ ...entry, symbol }, ...rest].slice(0, SEARCH_HISTORY_LIMIT);
}

export function toSearchHistoryEntry(stock: StockData): SearchHistoryEntry {
  return { symbol: stock.symbol, companyName: stock.companyName };
}

export function isSearchHistoryEntry(value: unknown): value is SearchHistoryEntry {
  return isRecord(value) && typeof value.symbol === 'string' && typeof value.companyName === 'string';
}
