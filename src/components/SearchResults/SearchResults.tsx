import { useEffect, useState } from 'react';
import { SearchState } from '../../types/stock';
import { fetchStockQuote } from '../../services/finnhubService';
import { StockCard } from './StockCard';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  state: SearchState;
}

interface StockQuote {
  currentPrice: number;
  change: number;
  changePercent: number;
}

function useStockQuotes(state: SearchState): Record<string, StockQuote | null> {
  const [quotes, setQuotes] = useState<Record<string, StockQuote | null>>({});

  useEffect(() => {
    if (state.status === 'success') {
      const loadQuotes = async (): Promise<void> => {
        for (const stock of state.data) {
          const quote = await fetchStockQuote(stock.symbol);
          setQuotes((prev) => ({ ...prev, [stock.symbol]: quote }));
        }
      };
      void loadQuotes();
    }
  }, [state]);

  return quotes;
}

export function SearchResults({ state }: SearchResultsProps): React.ReactElement | null {
  const quotes = useStockQuotes(state);

  if (state.status === 'idle') {
    return null;
  }

  if (state.status === 'loading') {
    return <div className={styles.message}>Loading...</div>;
  }

  if (state.status === 'error') {
    return <div className={`${styles.message} ${styles.error}`}>{state.message}</div>;
  }

  if (state.data.length === 0) {
    return <div className={`${styles.message} ${styles.notFound}`}>Stock not found</div>;
  }

  return (
    <div className={styles.container}>
      {state.data.map((stock) => (
        <StockCard key={stock.symbol} symbol={stock.symbol} name={stock.name} quote={quotes[stock.symbol]} />
      ))}
    </div>
  );
}
