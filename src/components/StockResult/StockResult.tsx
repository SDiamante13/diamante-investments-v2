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
    </div>
  );
}
