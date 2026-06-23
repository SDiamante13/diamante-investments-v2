import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import { isPositiveFiniteNumber } from '../../utils/numbers';
import StockRange from '../StockRange/StockRange';
import styles from './StockResult.module.css';

interface StockResultProps {
  stockData: StockData;
  isWatched?: boolean;
  watchlistStatus?: string;
  onToggleWatchlist?: () => void;
}

function formatDollarChange(value: number): string {
  return value >= 0 ? `+$${value.toFixed(2)}` : `-$${Math.abs(value).toFixed(2)}`;
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

interface StockHeaderProps {
  stock: StockData;
  isWatched: boolean;
  onToggleWatchlist?: () => void;
}

function watchButtonLabel(stock: StockData, isWatched: boolean): string {
  return isWatched ? `Stop watching ${stock.symbol}` : `Watch ${stock.symbol}`;
}

function watchButtonText(isWatched: boolean): string {
  return isWatched ? '★ Watching' : '☆ Watch';
}

function StockHeader({ stock, isWatched, onToggleWatchlist }: Readonly<StockHeaderProps>): ReactElement {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.symbol}>{stock.symbol}</div>
        <div className={styles.company}>{stock.companyName}</div>
      </div>
      {onToggleWatchlist && (
        <button
          className={styles.watchButton}
          type="button"
          aria-label={watchButtonLabel(stock, isWatched)}
          onClick={onToggleWatchlist}
          aria-pressed={isWatched}
        >
          {watchButtonText(isWatched)}
        </button>
      )}
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

function unavailableMetricFields(stock: StockData): string[] {
  const fields: ReadonlyArray<readonly [string, number | null | undefined]> = [
    ['Open', stock.openPrice],
    ['Day high', stock.dayHigh],
    ['Day low', stock.dayLow],
    ['Market cap', stock.marketCap],
    ['P/E ratio', stock.peRatio],
  ];
  return fields.filter(([, value]) => !isPositiveFiniteNumber(value)).map(([label]) => label);
}

function hasValidYearRange(stock: StockData): boolean {
  return isPositiveFiniteNumber(stock.yearHigh) && isPositiveFiniteNumber(stock.yearLow) && stock.yearHigh > stock.yearLow;
}

function unavailableFields(stock: StockData): string[] {
  const rangeFields = hasValidYearRange(stock) ? [] : ['52-week range'];
  return [...unavailableMetricFields(stock), ...rangeFields];
}

export default function StockResult({
  stockData,
  isWatched = false,
  watchlistStatus = '',
  onToggleWatchlist,
}: Readonly<StockResultProps>): ReactElement {
  const missingFields = unavailableFields(stockData);

  return (
    <div className={styles.card}>
      <StockHeader stock={stockData} isWatched={isWatched} onToggleWatchlist={onToggleWatchlist} />
      <PriceSection stock={stockData} />
      {watchlistStatus && (
        <div className={styles.watchStatus} role="status">
          {watchlistStatus}
        </div>
      )}
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
