import type { ReactElement } from 'react';
import styles from './StockPreviewItem.module.css';

import { FinnhubSearchResult } from '../../services/finnhub/types.ts';

interface StockPreviewItemProps {
  result: FinnhubSearchResult;
  onSelect: () => void;
}

export default function StockPreviewItem({ result, onSelect }: StockPreviewItemProps): ReactElement {
  return (
    <div className={styles.item} onClick={onSelect}>
      <div className={styles.symbol}>{result.symbol}</div>
      <div className={styles.company}>{result.description}</div>
    </div>
  );
}
