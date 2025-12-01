import { useState } from 'react';
import { getStockData } from '../services/finnhub';
import type { StockData } from '../types/stock';

export function useStockData(): {
  stockData: StockData | null;
  error: string;
  loadStockData: (symbol: string) => Promise<void>;
} {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState('');

  async function loadStockData(symbol: string): Promise<void> {
    setError('');
    const data = await getStockData(symbol);
    if (data) {
      setStockData(data);
    } else {
      setStockData(null);
      setError('No results found');
    }
  }

  return { stockData, error, loadStockData };
}
