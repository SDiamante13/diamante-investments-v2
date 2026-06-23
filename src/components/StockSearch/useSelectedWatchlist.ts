import { useState } from 'react';
import { useWatchlist } from '../../hooks/useWatchlist';
import type { StockData } from '../../types/stock';
import type { WatchlistItem } from '../../types/watchlist';
import { toWatchlistItem } from '../../utils/watchlist';

export interface SelectedWatchlist {
  isWatched: boolean;
  items: WatchlistItem[];
  onToggle: () => void;
  status: string;
}

export function useSelectedWatchlist(stockData: StockData | null): SelectedWatchlist {
  const [status, setStatus] = useState('');
  const watchlist = useWatchlist();
  const isWatched = stockData ? watchlist.isWatched(stockData.symbol) : false;

  function handleToggle(): void {
    if (!stockData) return;
    if (isWatched) {
      watchlist.remove(stockData.symbol);
      setStatus(`Removed ${stockData.symbol} from watchlist`);
      return;
    }
    watchlist.upsert(toWatchlistItem(stockData));
    setStatus(`Added ${stockData.symbol} to watchlist`);
  }

  return {
    isWatched,
    items: watchlist.items,
    onToggle: handleToggle,
    status,
  };
}
