import type { SearchHistoryEntry } from '../types/searchHistory';
import type { StockData } from '../types/stock';
import type { StockListRow } from '../types/stockListRow';
import { normalizeSymbol } from './symbols';

export function recordSearch(entries: SearchHistoryEntry[], entry: SearchHistoryEntry, limit: number): SearchHistoryEntry[] {
  const newest = { ...entry, symbol: normalizeSymbol(entry.symbol) };
  const older = entries.filter((existing) => normalizeSymbol(existing.symbol) !== newest.symbol);
  return [newest, ...older].slice(0, limit);
}

export function toSearchHistoryEntry(stock: StockData): SearchHistoryEntry {
  return { symbol: normalizeSymbol(stock.symbol), companyName: stock.companyName };
}

export function toStockListRow(entry: SearchHistoryEntry): StockListRow {
  return { symbol: entry.symbol, description: entry.companyName };
}
