import type { StockData } from '../types/stock';
import type { WatchlistItem } from '../types/watchlist';
import { normalizeSymbol } from './symbols';

export function toWatchlistItem(stock: StockData): WatchlistItem {
  return {
    symbol: normalizeSymbol(stock.symbol),
    companyName: stock.companyName,
    currentPrice: stock.currentPrice,
    dollarChange: stock.dollarChange,
    percentChange: stock.percentChange,
  };
}

export function upsertWatchlistItem(items: WatchlistItem[], item: WatchlistItem): WatchlistItem[] {
  const normalizedItem = { ...item, symbol: normalizeSymbol(item.symbol) };
  return [normalizedItem, ...items.filter((existing) => normalizeSymbol(existing.symbol) !== normalizedItem.symbol)];
}

export function removeWatchlistSymbol(items: WatchlistItem[], symbol: string): WatchlistItem[] {
  const normalizedSymbol = normalizeSymbol(symbol);
  return items.filter((item) => normalizeSymbol(item.symbol) !== normalizedSymbol);
}
