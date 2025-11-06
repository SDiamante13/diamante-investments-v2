import { SearchState } from '../../types/stock';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  state: SearchState;
}

export function SearchResults({ state }: SearchResultsProps): React.ReactElement | null {
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
        <div key={stock.symbol} className={styles.stock}>
          <div className={styles.symbol}>{stock.symbol}</div>
          <div className={styles.name}>{stock.name}</div>
        </div>
      ))}
    </div>
  );
}
