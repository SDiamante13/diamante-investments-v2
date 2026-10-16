import type { ReactElement, FormEvent } from 'react';
import SearchHistoryList from '../SearchHistoryList/SearchHistoryList';
import StockPreviewList from '../StockPreviewList/StockPreviewList';
import styles from './SearchForm.module.css';

import type { FinnhubSearchResult } from '../../services/finnhub/types.ts';
import type { SearchHistoryView } from '../StockSearch/useSearchHistoryDropdown';

type SearchFormProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: FormEvent) => void;
  previewResults: FinnhubSearchResult[];
  showPreviews: boolean;
  debouncedQuery: string;
  onSelect: (result: FinnhubSearchResult) => void;
  history: SearchHistoryView;
};

export default function SearchForm({
  query,
  onQueryChange,
  onSubmit,
  previewResults,
  showPreviews,
  debouncedQuery,
  onSelect,
  history,
}: Readonly<SearchFormProps>): ReactElement {
  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e): void => onQueryChange(e.target.value)}
          onFocus={history.onFocus}
          onBlur={history.onBlur}
          className={styles.searchInput}
          placeholder="Search by ticker (e.g., AAPL)"
        />
        {history.isOpen && <SearchHistoryList entries={history.entries} onSelect={history.onSelect} />}
        {showPreviews && previewResults.length > 0 && <StockPreviewList results={previewResults} onSelect={onSelect} />}
        {showPreviews && debouncedQuery.length >= 2 && previewResults.length === 0 && (
          <div className={styles.noMatches}>No matches found</div>
        )}
      </div>
    </form>
  );
}
