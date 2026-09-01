import { useSearchHistory } from '../../hooks/useSearchHistory';
import { useStockData } from '../../hooks/useStockData';
import type { FinnhubSearchResult } from '../../services/finnhub/types';
import type { SearchHistoryEntry } from '../../types/searchHistory';
import type { StockData } from '../../types/stock';
import { toSearchHistoryEntry } from '../../utils/searchHistory';

export interface RecordedSearch {
  error: string;
  loadingSymbol: string;
  recentEntries: SearchHistoryEntry[];
  search: (stock: string | FinnhubSearchResult) => Promise<void>;
  stockData: StockData | null;
}

export function useRecordedSearch(): RecordedSearch {
  const { stockData, error, loadingSymbol, loadStockData } = useStockData();
  const history = useSearchHistory();

  async function search(stock: string | FinnhubSearchResult): Promise<void> {
    const loaded = await loadStockData(stock);
    if (loaded) history.record(toSearchHistoryEntry(loaded));
  }

  return { error, loadingSymbol, recentEntries: history.entries, search, stockData };
}
