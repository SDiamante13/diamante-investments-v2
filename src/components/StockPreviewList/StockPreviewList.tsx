import type { ReactElement } from 'react';
import StockPreviewItem from '../StockPreviewItem/StockPreviewItem';
import styles from './StockPreviewList.module.css';

import type { StockListRow } from '../../types/stockListRow';

interface StockPreviewListProps<T extends StockListRow> {
  results: T[];
  onSelect: (result: T) => void;
  heading?: string;
}

export default function StockPreviewList<T extends StockListRow>({
  results,
  onSelect,
  heading,
}: Readonly<StockPreviewListProps<T>>): ReactElement {
  return (
    <section className={styles.list} aria-label={heading ?? 'Matches'}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {results.map((result) => (
        <StockPreviewItem key={result.symbol} result={result} onSelect={(): void => onSelect(result)} />
      ))}
    </section>
  );
}
