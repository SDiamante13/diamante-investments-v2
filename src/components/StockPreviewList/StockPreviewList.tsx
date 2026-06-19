import type { ReactElement } from 'react';
import StockPreviewItem from '../StockPreviewItem/StockPreviewItem';
import styles from './StockPreviewList.module.css';

import type { FinnhubSearchResult } from '../../services/finnhub/types.ts';

interface StockPreviewListProps {
  results: FinnhubSearchResult[];
  onSelect: (result: FinnhubSearchResult) => void;
}

export default function StockPreviewList({ results, onSelect }: StockPreviewListProps): ReactElement {
  return (
    <div className={styles.dropdown}>
      {results.map((result) => (
        <StockPreviewItem key={result.symbol} result={result} onSelect={(): void => onSelect(result)} />
      ))}
    </div>
  );
}
