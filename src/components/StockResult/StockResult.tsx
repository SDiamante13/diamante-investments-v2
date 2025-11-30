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

export default function StockResult({ stockData }: StockResultProps): ReactElement {
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
    </div>
  );
}
