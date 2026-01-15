import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import { formatMarketCap, formatMetricValue, calculateRangePosition } from '../../utils/formatters';
import styles from './StockMetrics.module.css';

interface StockMetricsProps {
  data: Pick<StockData, 'quote' | 'profile' | 'metrics'>;
}

export default function StockMetrics({ data }: Readonly<StockMetricsProps>): ReactElement {
  const rangePosition = calculateRangePosition(data.quote.currentPrice, data.metrics.yearLow, data.metrics.yearHigh);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.metric}>
          <span className={styles.label}>Open</span>
          <span className={styles.value}>${data.quote.open.toFixed(2)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>High</span>
          <span className={styles.value}>${data.quote.high.toFixed(2)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Low</span>
          <span className={styles.value}>${data.quote.low.toFixed(2)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Mkt Cap</span>
          <span className={styles.value}>{formatMarketCap(data.profile.marketCap)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>P/E</span>
          <span className={styles.value}>{formatMetricValue(data.metrics.peRatio)}</span>
        </div>
      </div>
      <div className={styles.rangeSection}>
        <div className={styles.rangeTitle}>52W Range</div>
        <div className={styles.rangeBar}>
          <div className={styles.marker} style={{ left: `${rangePosition}%` }} />
        </div>
        <div className={styles.rangeLabels}>
          <span>{data.metrics.yearLow.toFixed(1)}</span>
          <span>{data.metrics.yearHigh.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
