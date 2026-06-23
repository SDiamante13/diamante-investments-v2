import type { StockData } from '../types/stock';
import type { WatchlistItem } from '../types/watchlist';

export function normalizeWatchlistSymbol(symbol: string): string {
  return symbol.trim().toUpperCase();
}

export function toWatchlistItem(stock: StockData): WatchlistItem {
  return {
    symbol: normalizeWatchlistSymbol(stock.symbol),
    companyName: stock.companyName,
    currentPrice: stock.currentPrice,
    dollarChange: stock.dollarChange,
    percentChange: stock.percentChange,
  };
}

export function upsertWatchlistItem(items: WatchlistItem[], item: WatchlistItem): WatchlistItem[] {
  const normalizedItem = { ...item, symbol: normalizeWatchlistSymbol(item.symbol) };
  return [normalizedItem, ...items.filter((existing) => normalizeWatchlistSymbol(existing.symbol) !== normalizedItem.symbol)];
}

export function removeWatchlistSymbol(items: WatchlistItem[], symbol: string): WatchlistItem[] {
  const normalizedSymbol = normalizeWatchlistSymbol(symbol);
  return items.filter((item) => normalizeWatchlistSymbol(item.symbol) !== normalizedSymbol);
}
