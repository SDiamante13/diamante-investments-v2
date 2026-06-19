import type { ReactElement, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import StockResult from '../StockResult/StockResult';
import SearchForm from '../SearchForm/SearchForm';
import { useStockPreviews } from '../../hooks/useStockPreviews';
import { useStockData } from '../../hooks/useStockData';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './StockSearch.module.css';
import type { FinnhubSearchResult } from '../../services/finnhub/types';

function LoadingCard({ symbol }: { symbol: string }): ReactElement {
  return (
    <div className={styles.loadingCard} role="status" aria-label={`Loading ${symbol} details`}>
      Loading {symbol} details…
    </div>
  );
}

export default function StockSearch(): ReactElement {
  const [query, setQuery] = useState('');
  const [showPreviews, setShowPreviews] = useState(false);
  const { results } = useStockPreviews(query);
  const { stockData, error, loadingSymbol, loadStockData } = useStockData();
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    setShowPreviews(debouncedQuery.length >= 2);
  }, [debouncedQuery]);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setShowPreviews(false);
    await loadStockData(query);
  }

  function handleSelect(result: FinnhubSearchResult): void {
    setShowPreviews(false);
    void loadStockData(result);
  }

  return (
    <div className={styles.container}>
      <div className={styles.decorativeLines} />
      <h1 className={styles.title}>Diamante Investments</h1>
      <SearchForm
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        previewResults={results}
        showPreviews={showPreviews}
        debouncedQuery={debouncedQuery}
        onSelect={handleSelect}
      />
      {error && <div className={styles.error}>{error}</div>}
      {loadingSymbol && <LoadingCard symbol={loadingSymbol} />}
      {stockData && <StockResult stockData={stockData} />}
    </div>
  );
}
