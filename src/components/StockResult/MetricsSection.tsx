import type { ReactElement } from 'react';
import { formatPrice, formatVolume, formatMarketCap, formatPERatio } from '../../utils/formatters';
import styles from './StockResult.module.css';

interface MetricsSectionProps {
  openPrice: number;
  high: number;
  low: number;
  volume: number | null;
  marketCap: number | null;
  peRatio: number | null;
}

export default function MetricsSection({ openPrice, high, low, volume, marketCap, peRatio }: Readonly<MetricsSectionProps>): ReactElement {
  return (
    <div className={styles.metricsSection}>
      <div className={styles.metricRow}>
        <div className={styles.metric}>
          <span className={styles.label}>Open</span>
          <span className={styles.value}>{formatPrice(openPrice)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>High</span>
          <span className={styles.value}>{formatPrice(high)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Low</span>
          <span className={styles.value}>{formatPrice(low)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Volume</span>
          <span className={styles.value}>{formatVolume(volume)}</span>
        </div>
      </div>

      <div className={styles.metricRow}>
        <div className={styles.metric}>
          <span className={styles.label}>Market Cap</span>
          <span className={styles.value}>{formatMarketCap(marketCap)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>PE Ratio</span>
          <span className={styles.value}>{formatPERatio(peRatio)}</span>
        </div>
      </div>
    </div>
  );
}
