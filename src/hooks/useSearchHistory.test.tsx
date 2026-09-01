import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { useSearchHistory } from './useSearchHistory';

const STORAGE_KEY = 'diamante.searchHistory.v1';

function SearchHistoryHarness(): ReactElement {
  const { entries, record } = useSearchHistory();
  return (
    <ul>
      <li>
        <button onClick={(): void => record({ symbol: 'GOOGL', companyName: 'ALPHABET INC' })}>Record GOOGL</button>
      </li>
      {entries.length === 0 ? <li>No recent searches</li> : null}
      {entries.map((entry) => (
        <li key={entry.symbol}>{entry.symbol}</li>
      ))}
    </ul>
  );
}

describe('useSearchHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('restores previously searched stocks from storage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [{ symbol: 'AAPL', companyName: 'APPLE INC' }] }));

    render(<SearchHistoryHarness />);

    expect(screen.getByText('AAPL')).toBeInTheDocument();
  });

  test('keeps only the five most recent searches', () => {
    const stored = ['MSFT', 'AMZN', 'META', 'NVDA', 'TSLA'].map((symbol) => ({ symbol, companyName: `${symbol} INC` }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: stored }));
    render(<SearchHistoryHarness />);

    userEvent.click(screen.getByRole('button', { name: 'Record GOOGL' }));

    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Record GOOGL',
      'GOOGL',
      'MSFT',
      'AMZN',
      'META',
      'NVDA',
    ]);
  });
});
