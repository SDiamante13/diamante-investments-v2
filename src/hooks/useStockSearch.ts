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

export function useStockSearch(): {
  results: StockData[];
  isLoading: boolean;
  search: (query: string) => Promise<void>;
} {
  const [results, setResults] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (query: string): Promise<void> => {
    setIsLoading(true);
    const searchResponse = await searchStock(query);

    if (searchResponse.count > 0) {
      const stockPromises = searchResponse.result.map(async (stock) => {
        const quote = await getQuote(stock.symbol);
        return transformToStockData(stock, quote);
      });

      const stocks = await Promise.all(stockPromises);
      setResults(stocks);
    }

    setIsLoading(false);
  };

  return { results, isLoading, search };
}
