import type { ReactElement, FormEvent } from 'react';
import StockPreviewList from '../StockPreviewList/StockPreviewList';
import styles from './SearchForm.module.css';

import type { FinnhubSearchResult } from '../../services/finnhub/types.ts';
import type { StockListRow } from '../../types/stockListRow';

type SearchFormProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: FormEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  previewResults: FinnhubSearchResult[];
  showMatches: boolean;
  recentRows: StockListRow[];
  onSelect: (result: FinnhubSearchResult) => void;
  onSelectRecent: (row: StockListRow) => void;
};

export default function SearchForm({
  query,
  onQueryChange,
  onSubmit,
  onFocus,
  onBlur,
  previewResults,
  showMatches,
  recentRows,
  onSelect,
  onSelectRecent,
}: Readonly<SearchFormProps>): ReactElement {
  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e): void => onQueryChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={styles.searchInput}
          placeholder="Search by ticker (e.g., AAPL)"
        />
        <div className={styles.dropdown} onMouseDown={(e): void => e.preventDefault()}>
          {showMatches && previewResults.length > 0 && <StockPreviewList results={previewResults} onSelect={onSelect} />}
          {showMatches && previewResults.length === 0 && <div className={styles.noMatches}>No matches found</div>}
          {recentRows.length > 0 && <StockPreviewList results={recentRows} onSelect={onSelectRecent} heading="Recent" />}
        </div>
      </div>
    </form>
  );
}
