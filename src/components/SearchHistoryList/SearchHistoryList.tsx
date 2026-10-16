import type { ReactElement } from 'react';
import type { SearchHistoryEntry } from '../../types/searchHistory';
import styles from './SearchHistoryList.module.css';

interface SearchHistoryListProps {
  entries: SearchHistoryEntry[];
  onSelect: (entry: SearchHistoryEntry) => void;
}

export default function SearchHistoryList({ entries, onSelect }: Readonly<SearchHistoryListProps>): ReactElement {
  return (
    <section className={styles.dropdown} aria-labelledby="search-history-heading">
      <h2 id="search-history-heading" className={styles.heading}>
        Recent searches
      </h2>
      {entries.map((entry) => (
        <button key={entry.symbol} type="button" className={styles.row} onClick={(): void => onSelect(entry)}>
          <span className={styles.icon} aria-hidden="true">
            ◷
          </span>
          <span className={styles.symbol}>{entry.symbol}</span>
          <span className={styles.company}>{entry.companyName}</span>
        </button>
      ))}
    </section>
  );
}
