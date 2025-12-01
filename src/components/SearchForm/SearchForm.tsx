import type { ReactElement, FormEvent } from 'react';
import type { FinnhubSearchResult } from '../../types/stock';
import StockPreviewList from '../StockPreviewList/StockPreviewList';
import styles from './SearchForm.module.css';

type SearchFormProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: FormEvent) => void;
  previewResults: FinnhubSearchResult[];
  showPreviews: boolean;
  debouncedQuery: string;
  onSelect: (symbol: string) => void;
};

export default function SearchForm({
  query,
  onQueryChange,
  onSubmit,
  previewResults,
  showPreviews,
  debouncedQuery,
  onSelect,
}: SearchFormProps): ReactElement {
  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e): void => onQueryChange(e.target.value)}
          className={styles.searchInput}
          placeholder="Search by ticker (e.g., AAPL)"
        />
        {showPreviews && previewResults.length > 0 && (
          <StockPreviewList results={previewResults} onSelect={onSelect} />
        )}
        {showPreviews && debouncedQuery.length >= 2 && previewResults.length === 0 && (
          <div className={styles.noMatches}>No matches found</div>
        )}
      </div>
    </form>
  );
}
