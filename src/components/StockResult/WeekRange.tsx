import type { ReactElement } from 'react';
import styles from './WeekRange.module.css';

interface WeekRangeProps {
  week52High: number;
  week52Low: number;
  currentPrice: number;
}

function calculatePosition(current: number, low: number, high: number): number {
  if (high === low) return 50;
  return ((current - low) / (high - low)) * 100;
}

export default function WeekRange({ week52High, week52Low, currentPrice }: Readonly<WeekRangeProps>): ReactElement {
  const position = calculatePosition(currentPrice, week52Low, week52High);

  return (
    <div className={styles.container}>
      <div className={styles.header}>52W Range</div>
      <div className={styles.rangeRow}>
        <span className={styles.value}>${week52Low.toFixed(2)}</span>
        <div className={styles.bar}>
          <div className={styles.indicator} style={{ left: `${position}%` }} />
        </div>
        <span className={styles.value}>${week52High.toFixed(2)}</span>
      </div>
    </div>
  );
}
