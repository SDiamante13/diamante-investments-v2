import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import { formatMarketCap, formatMetricValue, calculateRangePosition } from '../../utils/formatters';
import styles from './StockMetrics.module.css';

interface StockMetricsProps {
  data: Pick<StockData, 'quote' | 'profile' | 'metrics'>;
}

function MetricItem({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className={styles.metric}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default function StockMetrics({ data }: Readonly<StockMetricsProps>): ReactElement {
  const rangePosition = calculateRangePosition(data.quote.currentPrice, data.metrics.yearLow, data.metrics.yearHigh);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <MetricItem label="Open" value={`$${data.quote.open.toFixed(2)}`} />
        <MetricItem label="High" value={`$${data.quote.high.toFixed(2)}`} />
        <MetricItem label="Low" value={`$${data.quote.low.toFixed(2)}`} />
        <MetricItem label="Mkt Cap" value={formatMarketCap(data.profile.marketCap)} />
        <MetricItem label="P/E" value={formatMetricValue(data.metrics.peRatio)} />
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
