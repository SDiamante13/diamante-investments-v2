import { useState } from 'react';
import { searchStock, getQuote } from '../services/api/stockService';
import type { StockData } from '../types/stock';
import type { SearchResult, Quote } from '../types/api';

function transformToStockData(result: SearchResult, quote: Quote): StockData {
  return {
    symbol: result.displaySymbol,
    name: result.description,
    currentPrice: quote.c,
    change: quote.d,
    changePercent: quote.dp,
  };
}

function extractFulfilledResults<T>(results: PromiseSettledResult<T>[]): T[] {
  return results.filter((result): result is PromiseFulfilledResult<T> => result.status === 'fulfilled').map((result) => result.value);
}

async function fetchStockData(query: string): Promise<StockData[]> {
  const searchResponse = await searchStock(query);

  if (searchResponse.count === 0) {
    throw new Error('No results found');
  }

  const stockPromises = searchResponse.result.map(async (stock) => {
    const quote = await getQuote(stock.symbol);
    return transformToStockData(stock, quote);
  });

  const results = await Promise.allSettled(stockPromises);
  const successfulStocks = extractFulfilledResults(results);

  if (successfulStocks.length === 0) {
    throw new Error('No accessible stock data found');
  }

  return successfulStocks;
}

export function useStockSearch(): {
  results: StockData[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<StockData[]>;
} {
  const [results, setResults] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string): Promise<StockData[]> => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const stocks = await fetchStockData(query);
      setResults(stocks);
      return stocks;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stocks';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading, error, search };
}
