import type { ReactElement } from 'react';
import type { WatchlistItem } from '../../types/watchlist';
import styles from './WatchlistView.module.css';

interface WatchlistViewProps {
  items: WatchlistItem[];
}

function formatDollar(value: number): string {
  return `$${value.toFixed(2)}`;
}

function formatDollarChange(value: number): string {
  return value >= 0 ? `+$${value.toFixed(2)}` : `-$${Math.abs(value).toFixed(2)}`;
}

function formatPercentChange(value: number): string {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${value.toFixed(2)}%`;
}

function WatchlistItemCard({ item }: Readonly<{ item: WatchlistItem }>): ReactElement {
  const changeClass = item.dollarChange >= 0 ? styles.positive : styles.negative;
  return (
    <article className={styles.item}>
      <div>
        <div className={styles.symbol}>{item.symbol}</div>
        <div className={styles.company}>{item.companyName}</div>
      </div>
      <div className={styles.values}>
        <div className={styles.price}>{formatDollar(item.currentPrice)}</div>
        <div className={changeClass}>{formatDollarChange(item.dollarChange)}</div>
        <div className={changeClass}>{formatPercentChange(item.percentChange)}</div>
      </div>
    </article>
  );
}

export default function WatchlistView({ items }: Readonly<WatchlistViewProps>): ReactElement {
  return (
    <section className={styles.panel} aria-labelledby="watchlist-heading">
      <h2 id="watchlist-heading" className={styles.heading}>
        Watchlist
      </h2>
      {items.length === 0 ? (
        <p className={styles.empty}>No stocks watched yet.</p>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <WatchlistItemCard key={item.symbol} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
