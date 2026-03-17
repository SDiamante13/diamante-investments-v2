import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import styles from './StockResult.module.css';

interface StockResultProps {
  stockData: StockData;
}

function formatDollarChange(value: number): string {
  if (value >= 0) {
    return `+$${value}`;
  }
  return `-$${Math.abs(value)}`;
}

function formatPercentChange(value: number): string {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${value.toFixed(2)}%`;
}

function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

function formatMarketCap(value: number | null): string {
  if (value === null) return 'N/A';
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}T`;
  if (value >= 1000) return `$${(value / 1000).toFixed(2)}B`;
  return `$${value.toFixed(2)}M`;
}

function formatNullable(value: number | null): string {
  if (value === null) return 'N/A';
  return value.toFixed(2);
}

function calculateRangePosition(current: number, low: number, high: number): number {
  if (high === low) return 50;
  return ((current - low) / (high - low)) * 100;
}

export default function StockResult({ stockData }: Readonly<StockResultProps>): ReactElement {
  const changeClass = stockData.dollarChange >= 0 ? styles.positive : styles.negative;
  const hasRange = stockData.fiftyTwoWeekHigh !== null && stockData.fiftyTwoWeekLow !== null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.symbol}>{stockData.symbol}</div>
        <div className={styles.company}>{stockData.companyName}</div>
      </div>
      <div className={styles.priceSection}>
        <div className={styles.currentPrice}>${stockData.currentPrice}</div>
        <div className={styles.changes}>
          <div className={`${styles.change} ${changeClass}`}>{formatDollarChange(stockData.dollarChange)}</div>
          <div className={`${styles.change} ${changeClass}`}>{formatPercentChange(stockData.percentChange)}</div>
        </div>
      </div>
      <MetricsGrid stockData={stockData} />
      {hasRange && <FiftyTwoWeekRange stockData={stockData} />}
    </div>
  );
}

function MetricsGrid({ stockData }: Readonly<{ stockData: StockData }>): ReactElement {
  return (
    <div className={styles.metricsGrid}>
      <div className={styles.metric}>
        <div className={styles.metricLabel}>Open</div>
        <div className={styles.metricValue}>{formatCurrency(stockData.open)}</div>
      </div>
      <div className={styles.metric}>
        <div className={styles.metricLabel}>High</div>
        <div className={styles.metricValue}>{formatCurrency(stockData.high)}</div>
      </div>
      <div className={styles.metric}>
        <div className={styles.metricLabel}>Low</div>
        <div className={styles.metricValue}>{formatCurrency(stockData.low)}</div>
      </div>
      <div className={styles.metric}>
        <div className={styles.metricLabel}>Market Cap</div>
        <div className={styles.metricValue}>{formatMarketCap(stockData.marketCap)}</div>
      </div>
      <div className={styles.metric}>
        <div className={styles.metricLabel}>PE Ratio</div>
        <div className={styles.metricValue}>{formatNullable(stockData.peRatio)}</div>
      </div>
    </div>
  );
}

function FiftyTwoWeekRange({ stockData }: Readonly<{ stockData: StockData }>): ReactElement {
  const low = stockData.fiftyTwoWeekLow!;
  const high = stockData.fiftyTwoWeekHigh!;
  const position = calculateRangePosition(stockData.currentPrice, low, high);

  return (
    <div className={styles.rangeSection}>
      <div className={styles.rangeHeader}>52-Week Range</div>
      <div className={styles.rangeLabels}>
        <span>{formatCurrency(low)}</span>
        <span>{formatCurrency(high)}</span>
      </div>
      <div className={styles.rangeTrack} role="meter" aria-valuenow={stockData.currentPrice} aria-valuemin={low} aria-valuemax={high}>
        <div className={styles.rangeMarker} style={{ left: `${position}%` }} />
      </div>
    </div>
  );
}
