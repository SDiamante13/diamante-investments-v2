import type { ReactElement } from 'react';
import styles from './WeekRange.module.css';

interface WeekRangeProps {
  currentPrice: number;
  week52Low: number | null;
  week52High: number | null;
}

function calculatePosition(current: number, low: number, high: number): number {
  if (high === low) return 50;
  const position = ((current - low) / (high - low)) * 100;
  return Math.max(0, Math.min(100, position));
}

export default function WeekRange({ currentPrice, week52Low, week52High }: Readonly<WeekRangeProps>): ReactElement | null {
  if (week52Low === null || week52High === null) return null;

  const position = calculatePosition(currentPrice, week52Low, week52High);

  return (
    <div className={styles.section}>
      <div className={styles.title}>52-Week Range</div>
      <div className={styles.bar}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${position}%` }} />
          <div className={styles.dot} style={{ left: `${position}%` }} />
        </div>
      </div>
      <div className={styles.labels}>
        <span>${week52Low.toFixed(2)}</span>
        <span>${week52High.toFixed(2)}</span>
      </div>
    </div>
  );
}
