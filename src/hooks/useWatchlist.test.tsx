import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { useWatchlist } from './useWatchlist';

const STORAGE_KEY = 'diamante.watchlist.v1';

function WatchlistHarness(): ReactElement {
  const { items } = useWatchlist();
  return (
    <ul>
      {items.length === 0 ? <li>Empty watchlist</li> : null}
      {items.map((item) => (
        <li key={item.symbol}>{item.symbol}</li>
      ))}
    </ul>
  );
}

describe('useWatchlist', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('restores valid watchlist items from localStorage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        items: [
          {
            symbol: 'AAPL',
            companyName: 'APPLE INC',
            currentPrice: 145.52,
            dollarChange: 2.35,
            percentChange: 1.64,
          },
        ],
      })
    );

    render(<WatchlistHarness />);

    expect(screen.getByText('AAPL')).toBeInTheDocument();
  });

  test('returns an empty watchlist when storage contains invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{bad json');

    render(<WatchlistHarness />);

    expect(screen.getByText('Empty watchlist')).toBeInTheDocument();
  });

  test('filters malformed watchlist rows from localStorage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        items: [
          { symbol: 'BROKEN', currentPrice: '145.52' },
          {
            symbol: 'MSFT',
            companyName: 'MICROSOFT CORP',
            currentPrice: 410.34,
            dollarChange: -1.4,
            percentChange: -0.34,
          },
        ],
      })
    );

    render(<WatchlistHarness />);

    expect(screen.queryByText('BROKEN')).not.toBeInTheDocument();
    expect(screen.getByText('MSFT')).toBeInTheDocument();
  });
});
