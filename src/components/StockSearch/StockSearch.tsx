import type { ReactElement, FormEvent } from 'react';
import { useState } from 'react';
import StockResult from '../StockResult/StockResult';
import SearchForm from '../SearchForm/SearchForm';
import { useStockPreviews } from '../../hooks/useStockPreviews';
import { useStockData } from '../../hooks/useStockData';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './StockSearch.module.css';

export default function StockSearch(): ReactElement {
  const [query, setQuery] = useState('');
  const { results, showPreviews } = useStockPreviews(query);
  const { stockData, error, loadStockData } = useStockData();
  const debouncedQuery = useDebounce(query, 400);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    await loadStockData(query);
  }

  function handleSelect(symbol: string): void {
    loadStockData(symbol);
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
      {stockData && <StockResult stockData={stockData} />}
    </div>
  );
}
