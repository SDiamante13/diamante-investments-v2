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

function calculateRangePosition(current: number, low: number, high: number): number {
  if (high === low) {
    return 50;
  }
  return Math.round(((current - low) / (high - low)) * 100);
}

function formatMarketCap(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}B`;
  }
  return `$${value.toFixed(2)}M`;
}

function MetricsGrid({ stockData }: Readonly<{ stockData: StockData }>): ReactElement | null {
  if (stockData.open == null) {
    return null;
  }

  return (
    <div className={styles.metricsGrid}>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>Open</span>
        <span className={styles.metricValue}>${stockData.open.toFixed(2)}</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>Mkt Cap</span>
        <span className={styles.metricValue}>{stockData.marketCap != null ? formatMarketCap(stockData.marketCap) : 'N/A'}</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>High</span>
        <span className={styles.metricValue}>${stockData.high?.toFixed(2)}</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>P/E</span>
        <span className={styles.metricValue}>{stockData.peRatio != null ? stockData.peRatio.toFixed(2) : 'N/A'}</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricLabel}>Low</span>
        <span className={styles.metricValue}>${stockData.low?.toFixed(2)}</span>
      </div>
    </div>
  );
}

function WeekRange52({ stockData }: Readonly<{ stockData: StockData }>): ReactElement | null {
  if (stockData.weekHigh52 == null || stockData.weekLow52 == null) {
    return null;
  }

  const position = calculateRangePosition(stockData.currentPrice, stockData.weekLow52, stockData.weekHigh52);

  return (
    <div className={styles.rangeSection}>
      <span className={styles.rangeLabel}>52-Week Range</span>
      <div className={styles.rangeBar}>
        <span className={styles.rangeValue}>${stockData.weekLow52.toFixed(2)}</span>
        <div className={styles.rangeTrack}>
          <div
            role="meter"
            aria-label="Current price position in 52-week range"
            aria-valuenow={position}
            aria-valuemin={0}
            aria-valuemax={100}
            className={styles.rangeDot}
            style={{ left: `${position}%` }}
          />
        </div>
        <span className={styles.rangeValue}>${stockData.weekHigh52.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function StockResult({ stockData }: Readonly<StockResultProps>): ReactElement {
  const changeClass = stockData.dollarChange >= 0 ? styles.positive : styles.negative;

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
      <WeekRange52 stockData={stockData} />
    </div>
  );
}
