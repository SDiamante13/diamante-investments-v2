import { useRef, useState } from 'react';
import { getStockData } from '../services/finnhub/finnhub.ts';
import type { FinnhubSearchResult } from '../services/finnhub/types.ts';
import type { StockData } from '../types/stock';

export function useStockData(): {
  stockData: StockData | null;
  error: string;
  loadingSymbol: string;
  loadStockData: (stock: string | FinnhubSearchResult) => Promise<StockData | null>;
} {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState('');
  const [loadingSymbol, setLoadingSymbol] = useState('');
  const latestRequest = useRef(0);

  async function loadStockData(stock: string | FinnhubSearchResult): Promise<StockData | null> {
    const requestId = ++latestRequest.current;
    const symbol = typeof stock === 'string' ? stock.trim().toUpperCase() : stock.symbol;
    setError('');
    setStockData(null);
    setLoadingSymbol(symbol);
    try {
      const data = await getStockData(stock);
      if (requestId !== latestRequest.current) return null;
      setStockData(data);
      if (!data) setError('No results found');
      return data;
    } catch {
      if (requestId === latestRequest.current) setError('Unable to load stock data');
      return null;
    } finally {
      if (requestId === latestRequest.current) setLoadingSymbol('');
    }
  }

  return { stockData, error, loadingSymbol, loadStockData };
}
