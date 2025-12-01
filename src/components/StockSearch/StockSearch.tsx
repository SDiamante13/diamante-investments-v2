import type { ReactElement, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { getStockData, searchStock } from '../../services/finnhub';
import type { StockData, FinnhubSearchResult } from '../../types/stock';
import StockResult from '../StockResult/StockResult';
import StockPreviewList from '../StockPreviewList/StockPreviewList';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './StockSearch.module.css';

export default function StockSearch(): ReactElement {
  const [query, setQuery] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState('');
  const [previewResults, setPreviewResults] = useState<FinnhubSearchResult[]>([]);
  const [showPreviews, setShowPreviews] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    async function fetchPreviews(): Promise<void> {
      if (debouncedQuery.length >= 2) {
        const results = await searchStock(debouncedQuery);
        setPreviewResults(results);
        setShowPreviews(true);
      } else {
        setPreviewResults([]);
        setShowPreviews(false);
      }
    }
    void fetchPreviews();
  }, [debouncedQuery]);

  async function loadStockData(symbol: string): Promise<void> {
    setShowPreviews(false);
    setError('');
    const data = await getStockData(symbol);
    if (data) {
      setStockData(data);
    } else {
      setStockData(null);
      setError('No results found');
    }
  }

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
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            value={query}
            onChange={(e): void => setQuery(e.target.value)}
            className={styles.searchInput}
            placeholder="Search by ticker (e.g., AAPL)"
          />
          {showPreviews && previewResults.length > 0 && (
            <StockPreviewList results={previewResults} onSelect={handleSelect} />
          )}
          {showPreviews && debouncedQuery.length >= 2 && previewResults.length === 0 && (
            <div className={styles.noMatches}>No matches found</div>
          )}
        </div>
      </form>
      {error && <div className={styles.error}>{error}</div>}
      {stockData && <StockResult stockData={stockData} />}
    </div>
  );
}
