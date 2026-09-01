import type { ReactElement } from 'react';
import styles from './StockPreviewItem.module.css';

import type { StockListRow } from '../../types/stockListRow';

interface StockPreviewItemProps {
  result: StockListRow;
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
