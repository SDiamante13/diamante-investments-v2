import type { ReactElement } from 'react';
import { formatDollarChange, formatPercentChange, formatPrice } from '../../utils/formatters';
import styles from './StockResult.module.css';

interface PriceSectionProps {
  currentPrice: number;
  dollarChange: number;
  percentChange: number;
  weekHigh52: number | null;
  weekLow52: number | null;
}

export default function PriceSection({
  currentPrice,
  dollarChange,
  percentChange,
  weekHigh52,
  weekLow52,
}: Readonly<PriceSectionProps>): ReactElement {
  const changeClass = dollarChange >= 0 ? styles.positive : styles.negative;

  return (
    <div className={styles.priceSection}>
      <div className={styles.priceColumn}>
        <div className={styles.currentPrice}>${currentPrice}</div>
        <div className={styles.changes}>
          <div className={`${styles.change} ${changeClass}`}>{formatDollarChange(dollarChange)}</div>
          <div className={`${styles.change} ${changeClass}`}>{formatPercentChange(percentChange)}</div>
        </div>
      </div>

      {weekHigh52 !== null && weekLow52 !== null && (
        <div className={styles.rangeColumn}>
          <div className={styles.rangeLabel}>52-WEEK RANGE</div>
          <div className={styles.rangeValues}>
            <span>{formatPrice(weekLow52)}</span>
            <span>—</span>
            <span>{formatPrice(weekHigh52)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
