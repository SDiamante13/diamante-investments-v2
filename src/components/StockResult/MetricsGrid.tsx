import type { ReactElement } from 'react';
import { formatMarketCap } from '../../utils/formatMarketCap';
import styles from './MetricsGrid.module.css';

interface MetricsGridProps {
  open: number | null;
  high: number | null;
  low: number | null;
  marketCap: number | null;
  peRatio: number | null;
}

function formatPrice(value: number | null): string {
  if (value === null) return '\u2014';
  return `$${value.toFixed(2)}`;
}

function formatNumber(value: number | null): string {
  if (value === null) return '\u2014';
  return value.toFixed(2);
}

export default function MetricsGrid({ open, high, low, marketCap, peRatio }: Readonly<MetricsGridProps>): ReactElement {
  const metrics = [
    { label: 'Open', value: formatPrice(open) },
    { label: 'High', value: formatPrice(high) },
    { label: 'Low', value: formatPrice(low) },
    { label: 'Mkt Cap', value: formatMarketCap(marketCap) },
    { label: 'PE Ratio', value: formatNumber(peRatio) },
  ];

  return (
    <div className={styles.grid}>
      {metrics.map(({ label, value }) => (
        <div key={label} className={styles.item}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  );
}
