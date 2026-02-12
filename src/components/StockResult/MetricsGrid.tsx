import type { ReactElement } from 'react';
import styles from './MetricsGrid.module.css';

interface MetricsGridProps {
  open: number;
  high: number;
  low: number;
  marketCap: number;
  peRatio: number;
}

function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

function formatMarketCap(millions: number): string {
  if (millions >= 1_000_000) {
    return `$${(millions / 1_000_000).toFixed(2)}T`;
  }
  if (millions >= 1_000) {
    return `$${(millions / 1_000).toFixed(2)}B`;
  }
  return `$${millions.toFixed(2)}M`;
}

export default function MetricsGrid({ open, high, low, marketCap, peRatio }: Readonly<MetricsGridProps>): ReactElement {
  const metrics = [
    { label: 'Open', value: formatPrice(open) },
    { label: 'High', value: formatPrice(high) },
    { label: 'Low', value: formatPrice(low) },
    { label: 'Mkt Cap', value: formatMarketCap(marketCap) },
    { label: 'P/E', value: peRatio.toFixed(2) },
  ];

  return (
    <div className={styles.grid}>
      {metrics.map(({ label, value }) => (
        <div key={label} className={styles.metric}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  );
}
