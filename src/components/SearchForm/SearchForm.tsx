import type { ReactElement, FormEvent } from 'react';
import SearchHistoryList from '../SearchHistoryList/SearchHistoryList';
import StockPreviewList from '../StockPreviewList/StockPreviewList';
import { MIN_PREVIEW_QUERY_LENGTH } from '../../utils/previewQuery';
import styles from './SearchForm.module.css';

import type { FinnhubSearchResult } from '../../services/finnhub/types';
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
  const showNoMatches = showPreviews && debouncedQuery.length >= MIN_PREVIEW_QUERY_LENGTH && previewResults.length === 0;

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
        {showNoMatches && <div className={styles.noMatches}>No matches found</div>}
      </div>
    </form>
  );
}
