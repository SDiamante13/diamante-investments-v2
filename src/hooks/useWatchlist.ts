import type { WatchlistItem } from '../types/watchlist';
import { isFiniteNumber, isRecord } from '../utils/guards';
import { normalizeSymbol } from '../utils/symbols';
import { removeWatchlistSymbol, upsertWatchlistItem } from '../utils/watchlist';
import { usePersistedList } from './usePersistedList';

const STORAGE_KEY = 'diamante.watchlist.v1';

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

export function useWatchlist(): {
  items: WatchlistItem[];
  isWatched: (symbol: string) => boolean;
  remove: (symbol: string) => void;
  upsert: (item: WatchlistItem) => void;
} {
  const [items, setItems] = usePersistedList<WatchlistItem>(STORAGE_KEY, isWatchlistItem);

  function isWatched(symbol: string): boolean {
    const normalizedSymbol = normalizeSymbol(symbol);
    return items.some((item) => normalizeSymbol(item.symbol) === normalizedSymbol);
  }

  return {
    items,
    isWatched,
    remove: (symbol) => setItems((currentItems) => removeWatchlistSymbol(currentItems, symbol)),
    upsert: (item) => setItems((currentItems) => upsertWatchlistItem(currentItems, item)),
  };
}
