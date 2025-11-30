import type { ReactElement, FormEvent } from 'react';
import { useState } from 'react';
import { getStockData } from '../../services/finnhub';
import type { StockData } from '../../types/stock';
import StockResult from '../StockResult/StockResult';
import styles from './StockSearch.module.css';

export default function StockSearch(): ReactElement {
  const [query, setQuery] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setError('');
    const data = await getStockData(query);
    if (data) {
      setStockData(data);
    } else {
      setStockData(null);
      setError('No results found');
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e): void => setQuery(e.target.value)}
          className={styles.searchInput}
          placeholder="Search by ticker (e.g., AAPL)"
        />
      </form>
      {error && <div className={styles.error}>{error}</div>}
      {stockData && <StockResult stockData={stockData} />}
    </div>
  );
}
