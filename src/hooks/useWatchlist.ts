import { useEffect, useState } from 'react';
import type { WatchlistItem } from '../types/watchlist';
import { normalizeWatchlistSymbol, removeWatchlistSymbol, upsertWatchlistItem } from '../utils/watchlist';

const STORAGE_KEY = 'diamante.watchlist.v1';

interface WatchlistState {
  items: WatchlistItem[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isWatchlistItem(value: unknown): value is WatchlistItem {
  if (!isRecord(value)) return false;
  return (
    typeof value.symbol === 'string' &&
    typeof value.companyName === 'string' &&
    isFiniteNumber(value.currentPrice) &&
    isFiniteNumber(value.dollarChange) &&
    isFiniteNumber(value.percentChange)
  );
}

function parseWatchlistState(raw: string | null): WatchlistState {
  if (!raw) return { items: [] };
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isRecord(parsed) || !Array.isArray(parsed.items)) return { items: [] };
    return { items: parsed.items.filter(isWatchlistItem) };
  } catch {
    return { items: [] };
  }
}

function loadWatchlistItems(): WatchlistItem[] {
  return parseWatchlistState(localStorage.getItem(STORAGE_KEY)).items;
}

export function useWatchlist(): {
  items: WatchlistItem[];
  isWatched: (symbol: string) => boolean;
  remove: (symbol: string) => void;
  upsert: (item: WatchlistItem) => void;
} {
  const [items, setItems] = useState<WatchlistItem[]>(loadWatchlistItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
  }, [items]);

  function isWatched(symbol: string): boolean {
    const normalizedSymbol = normalizeWatchlistSymbol(symbol);
    return items.some((item) => normalizeWatchlistSymbol(item.symbol) === normalizedSymbol);
  }

  return {
    items,
    isWatched,
    remove: (symbol) => setItems((currentItems) => removeWatchlistSymbol(currentItems, symbol)),
    upsert: (item) => setItems((currentItems) => upsertWatchlistItem(currentItems, item)),
  };
}
