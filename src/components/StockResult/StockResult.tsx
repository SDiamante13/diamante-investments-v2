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
    <div>
      <div>{stockData.symbol}</div>
      <div>{stockData.companyName}</div>
      <div>${stockData.currentPrice}</div>
      <div className={changeClass}>{formatDollarChange(stockData.dollarChange)}</div>
      <div className={changeClass}>{formatPercentChange(stockData.percentChange)}</div>
    </div>
  );
}
