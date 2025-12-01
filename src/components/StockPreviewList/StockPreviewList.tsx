import type { ReactElement } from 'react';
import type { FinnhubSearchResult } from '../../types/stock';
import StockPreviewItem from '../StockPreviewItem/StockPreviewItem';
import styles from './StockPreviewList.module.css';

interface StockPreviewListProps {
  results: FinnhubSearchResult[];
  onSelect: (symbol: string) => void;
}

export default function StockPreviewList({ results, onSelect }: StockPreviewListProps): ReactElement {
  return (
    <div className={styles.dropdown}>
      {results.map((result) => (
        <StockPreviewItem key={result.symbol} result={result} onSelect={(): void => onSelect(result.symbol)} />
      ))}
    </div>
  );
}
