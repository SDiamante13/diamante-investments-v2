import type { ReactElement } from 'react';
import { isPositiveFiniteNumber } from '../../utils/numbers';
import styles from './StockRange.module.css';

interface StockRangeProps {
  current: number;
  high?: number | null;
  low?: number | null;
}

function rangePosition(current: number, low: number, high: number): number {
  const position = ((current - low) / (high - low)) * 100;
  return Math.round(Math.min(100, Math.max(0, position)));
}

function validRange(low: number | null | undefined, high: number | null | undefined): [number, number] | null {
  if (!isPositiveFiniteNumber(low) || !isPositiveFiniteNumber(high) || high <= low) return null;
  return [low, high];
}

export default function StockRange({ current, high, low }: Readonly<StockRangeProps>): ReactElement | null {
  const range = validRange(low, high);
  const position = range ? rangePosition(current, range[0], range[1]) : 0;

  return (
    <section className={styles.range} aria-labelledby="stock-range-label">
      <div id="stock-range-label" className={styles.label}>
        52-week range
      </div>
      {range ? (
        <>
          <div
            className={styles.track}
            role="meter"
            aria-label={`Current price is ${position}% through the 52-week range`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={position}
          >
            <span className={styles.marker} style={{ left: `${position}%` }} />
          </div>
          <div className={styles.bounds}>
            <span>${range[0].toFixed(2)}</span>
            <span>${range[1].toFixed(2)}</span>
          </div>
        </>
      ) : (
        <span className={styles.unavailable}>N/A</span>
      )}
    </section>
  );
}
