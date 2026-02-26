import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import MetricsGrid from './MetricsGrid';
import WeekRange from './WeekRange';
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
      <MetricsGrid
        open={stockData.open}
        high={stockData.high}
        low={stockData.low}
        marketCap={stockData.marketCap}
        peRatio={stockData.peRatio}
      />
      <WeekRange currentPrice={stockData.currentPrice} week52Low={stockData.week52Low} week52High={stockData.week52High} />
    </div>
  );
}
