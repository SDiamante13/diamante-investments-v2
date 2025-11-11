import styles from './SearchResults.module.css';

interface StockQuote {
  currentPrice: number;
  change: number;
  changePercent: number;
}

interface StockCardProps {
  symbol: string;
  name: string;
  quote: StockQuote | null | undefined;
}

function getChangeClass(quote: StockQuote | null | undefined): string {
  if (!quote) return '';
  if (quote.change > 0) return styles.positive;
  if (quote.change < 0) return styles.negative;
  return '';
}

function getIndicator(quote: StockQuote | null | undefined): string {
  if (!quote) return '';
  if (quote.change > 0) return '▲';
  if (quote.change < 0) return '▼';
  return '';
}

export function StockCard({ symbol, name, quote }: StockCardProps): React.ReactElement {
  return (
    <div className={styles.stock}>
      <div className={styles.symbol}>{symbol}</div>
      <div className={styles.name}>{name}</div>
      {quote && (
        <>
          <div className={styles.price}>${quote.currentPrice}</div>
          <div className={`${styles.change} ${getChangeClass(quote)}`}>
            Daily Change: {quote.change >= 0 ? '+' : ''}${quote.change.toFixed(2)} ({quote.changePercent >= 0 ? '+' : ''}
            {quote.changePercent.toFixed(2)}%) {getIndicator(quote)}
          </div>
        </>
      )}
    </div>
  );
}
