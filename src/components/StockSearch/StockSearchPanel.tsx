import type { FormEvent, ReactElement } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import StockResult from '../StockResult/StockResult';
import type { FinnhubSearchResult } from '../../services/finnhub/types';
import type { StockData } from '../../types/stock';
import styles from './StockSearch.module.css';

interface StockSearchPanelProps {
  debouncedQuery: string;
  error: string;
  isWatched: boolean;
  loadingSymbol: string;
  onQueryChange: (query: string) => void;
  onSelect: (result: FinnhubSearchResult) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
  onToggleWatchlist: () => void;
  previewResults: FinnhubSearchResult[];
  query: string;
  showPreviews: boolean;
  stockData: StockData | null;
  watchlistStatus: string;
}

function LoadingCard({ symbol }: Readonly<{ symbol: string }>): ReactElement {
  return (
    <div className={styles.loadingCard} role="status" aria-label={`Loading ${symbol} details`}>
      Loading {symbol} details…
    </div>
  );
}

export default function StockSearchPanel({
  query,
  onQueryChange,
  onSubmit,
  previewResults,
  showPreviews,
  debouncedQuery,
  onSelect,
  error,
  loadingSymbol,
  stockData,
  isWatched,
  watchlistStatus,
  onToggleWatchlist,
}: Readonly<StockSearchPanelProps>): ReactElement {
  return (
    <>
      <SearchForm
        query={query}
        onQueryChange={onQueryChange}
        onSubmit={onSubmit}
        previewResults={previewResults}
        showPreviews={showPreviews}
        debouncedQuery={debouncedQuery}
        onSelect={onSelect}
      />
      {error && <div className={styles.error}>{error}</div>}
      {loadingSymbol && <LoadingCard symbol={loadingSymbol} />}
      {stockData && (
        <StockResult stockData={stockData} isWatched={isWatched} watchlistStatus={watchlistStatus} onToggleWatchlist={onToggleWatchlist} />
      )}
    </>
  );
}
