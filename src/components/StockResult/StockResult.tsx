import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import {
  formatCurrency,
  formatDollarChange,
  formatMarketCap,
  formatNullable,
  formatPercentChange,
  calculateRangePosition,
} from '../../utils/formatters';
import styles from './StockResult.module.css';

interface StockResultProps {
  stockData: StockData;
}

export default function StockResult({ stockData }: Readonly<StockResultProps>): ReactElement {
  const changeStyle = stockData.dollarChange >= 0 ? styles.positive : styles.negative;
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
          <ChangeValue style={changeStyle}>{formatDollarChange(stockData.dollarChange)}</ChangeValue>
          <ChangeValue style={changeStyle}>{formatPercentChange(stockData.percentChange)}</ChangeValue>
        </div>
      </div>
      <MetricsGrid stockData={stockData} />
      {hasRange && (
        <FiftyTwoWeekRange currentPrice={stockData.currentPrice} low={stockData.fiftyTwoWeekLow!} high={stockData.fiftyTwoWeekHigh!} />
      )}
    </div>
  );
}

function ChangeValue({ style, children }: Readonly<{ style: string; children: string }>): ReactElement {
  return <div className={`${styles.change} ${style}`}>{children}</div>;
}

function MetricItem({ label, value }: Readonly<{ label: string; value: string }>): ReactElement {
  return (
    <div className={styles.metric}>
      <div className={styles.metricLabel}>{label}</div>
      <div className={styles.metricValue}>{value}</div>
    </div>
  );
}

function MetricsGrid({ stockData }: Readonly<{ stockData: StockData }>): ReactElement {
  return (
    <div className={styles.metricsGrid}>
      <MetricItem label="Open" value={formatCurrency(stockData.open)} />
      <MetricItem label="High" value={formatCurrency(stockData.high)} />
      <MetricItem label="Low" value={formatCurrency(stockData.low)} />
      <MetricItem label="Market Cap" value={formatMarketCap(stockData.marketCap)} />
      <MetricItem label="PE Ratio" value={formatNullable(stockData.peRatio)} />
    </div>
  );
}

interface FiftyTwoWeekRangeProps {
  currentPrice: number;
  low: number;
  high: number;
}

function FiftyTwoWeekRange({ currentPrice, low, high }: Readonly<FiftyTwoWeekRangeProps>): ReactElement {
  const position = calculateRangePosition(currentPrice, low, high);

  return (
    <div className={styles.rangeSection}>
      <div className={styles.rangeHeader}>52-Week Range</div>
      <div className={styles.rangeLabels}>
        <span>{formatCurrency(low)}</span>
        <span>{formatCurrency(high)}</span>
      </div>
      <div className={styles.rangeTrack} role="meter" aria-valuenow={currentPrice} aria-valuemin={low} aria-valuemax={high}>
        <div className={styles.rangeMarker} style={{ left: `${position}%` }} />
      </div>
    </div>
  );
}
