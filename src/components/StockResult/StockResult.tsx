import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import { isPositiveFiniteNumber } from '../../utils/numbers';
import StockRange from '../StockRange/StockRange';
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

function formatPrice(value: number | null | undefined): string {
  return isPositiveFiniteNumber(value) ? `$${value.toFixed(2)}` : 'N/A';
}

function formatMarketCap(value: number | null | undefined): string {
  if (!isPositiveFiniteNumber(value)) return 'N/A';
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  return `$${(value / 1_000_000).toFixed(2)}M`;
}

function formatRatio(value: number | null | undefined): string {
  return isPositiveFiniteNumber(value) ? value.toFixed(2) : 'N/A';
}

function Metric({ label, value }: Readonly<{ label: string; value: string }>): ReactElement {
  return (
    <div className={styles.metric}>
      <span className={styles.metricLabel}>{label}</span>
      <span className={styles.metricValue}>{value}</span>
    </div>
  );
}

function StockHeader({ stock }: Readonly<{ stock: StockData }>): ReactElement {
  return (
    <div className={styles.header}>
      <div className={styles.symbol}>{stock.symbol}</div>
      <div className={styles.company}>{stock.companyName}</div>
    </div>
  );
}

function PriceSection({ stock }: Readonly<{ stock: StockData }>): ReactElement {
  const changeClass = stock.dollarChange >= 0 ? styles.positive : styles.negative;
  return (
    <div className={styles.priceSection}>
      <div className={styles.currentPrice}>${stock.currentPrice}</div>
      <div className={styles.changes}>
        <div className={`${styles.change} ${changeClass}`}>{formatDollarChange(stock.dollarChange)}</div>
        <div className={`${styles.change} ${changeClass}`}>{formatPercentChange(stock.percentChange)}</div>
      </div>
    </div>
  );
}

function StockMetrics({ stock }: Readonly<{ stock: StockData }>): ReactElement {
  return (
    <div className={styles.metrics}>
      <Metric label="Open" value={formatPrice(stock.openPrice)} />
      <Metric label="Day high" value={formatPrice(stock.dayHigh)} />
      <Metric label="Day low" value={formatPrice(stock.dayLow)} />
      <Metric label="Market cap" value={formatMarketCap(stock.marketCap)} />
      <Metric label="P/E" value={formatRatio(stock.peRatio)} />
    </div>
  );
}

function unavailableFields(stock: StockData): string[] {
  const fields = [
    ['Open', stock.openPrice],
    ['Day high', stock.dayHigh],
    ['Day low', stock.dayLow],
    ['Market cap', stock.marketCap],
    ['P/E ratio', stock.peRatio],
  ] as const;
  const unavailable: string[] = fields.filter(([, value]) => !isPositiveFiniteNumber(value)).map(([label]) => label);
  const validRange = isPositiveFiniteNumber(stock.yearHigh) && isPositiveFiniteNumber(stock.yearLow) && stock.yearHigh > stock.yearLow;
  if (!validRange) {
    unavailable.push('52-week range');
  }
  return unavailable;
}

export default function StockResult({ stockData }: Readonly<StockResultProps>): ReactElement {
  const missingFields = unavailableFields(stockData);

  return (
    <div className={styles.card}>
      <StockHeader stock={stockData} />
      <PriceSection stock={stockData} />
      <StockMetrics stock={stockData} />
      <StockRange current={stockData.currentPrice} high={stockData.yearHigh} low={stockData.yearLow} />
      {missingFields.length > 0 && (
        <div className={styles.warning} role="status">
          Some data unavailable: {missingFields.join(', ')}
        </div>
      )}
    </div>
  );
}
