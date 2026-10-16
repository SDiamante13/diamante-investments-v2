import type { WatchlistItem } from '../types/watchlist';
import { isFiniteNumber, isRecord, parseStoredItems } from '../utils/storage';
import { hasSymbol } from '../utils/symbols';
import { removeWatchlistSymbol, upsertWatchlistItem } from '../utils/watchlist';
import { useLocalStorageState } from './useLocalStorageState';

const STORAGE_KEY = 'diamante.watchlist.v1';

interface WatchlistState {
  items: WatchlistItem[];
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
  return { items: parseStoredItems(raw, isWatchlistItem) };
}

export interface Watchlist {
  items: WatchlistItem[];
  isWatched: (symbol: string) => boolean;
  remove: (symbol: string) => void;
  upsert: (item: WatchlistItem) => void;
}

export function useWatchlist(): Watchlist {
  const [state, setState] = useLocalStorageState(STORAGE_KEY, parseWatchlistState);
  const { items } = state;

  return {
    items,
    isWatched: (symbol) => hasSymbol(items, symbol),
    remove: (symbol) => setState((current) => ({ items: removeWatchlistSymbol(current.items, symbol) })),
    upsert: (item) => setState((current) => ({ items: upsertWatchlistItem(current.items, item) })),
  };
}
