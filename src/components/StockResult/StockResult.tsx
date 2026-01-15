import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import { formatDollarChange, formatPercentChange } from '../../utils/formatters';
import StockMetrics from './StockMetrics';
import styles from './StockResult.module.css';

interface StockResultProps {
  stockData: StockData;
}

export default function StockResult({ stockData }: Readonly<StockResultProps>): ReactElement {
  const changeClass = stockData.quote.dollarChange >= 0 ? styles.positive : styles.negative;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.symbol}>{stockData.symbol}</div>
        <div className={styles.company}>{stockData.companyName}</div>
      </div>
      <div className={styles.priceSection}>
        <div className={styles.currentPrice}>${stockData.quote.currentPrice}</div>
        <div className={styles.changes}>
          <div className={`${styles.change} ${changeClass}`}>{formatDollarChange(stockData.quote.dollarChange)}</div>
          <div className={`${styles.change} ${changeClass}`}>{formatPercentChange(stockData.quote.percentChange)}</div>
        </div>
      </div>
      <StockMetrics data={stockData} />
    </div>
  );
}
