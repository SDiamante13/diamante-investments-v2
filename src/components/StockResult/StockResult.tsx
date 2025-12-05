import type { ReactElement } from 'react';
import type { StockData } from '../../types/stock';
import PriceSection from './PriceSection';
import MetricsSection from './MetricsSection';
import styles from './StockResult.module.css';

interface StockResultProps {
  stockData: StockData;
}

export default function StockResult({ stockData }: Readonly<StockResultProps>): ReactElement {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.symbol}>{stockData.symbol}</div>
        <div className={styles.company}>{stockData.companyName}</div>
      </div>

      <PriceSection
        currentPrice={stockData.currentPrice}
        dollarChange={stockData.dollarChange}
        percentChange={stockData.percentChange}
        weekHigh52={stockData.weekHigh52}
        weekLow52={stockData.weekLow52}
      />

      <MetricsSection
        openPrice={stockData.openPrice}
        high={stockData.high}
        low={stockData.low}
        volume={stockData.volume}
        marketCap={stockData.marketCap}
        peRatio={stockData.peRatio}
      />
    </div>
  );
}
