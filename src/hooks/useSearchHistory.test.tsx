import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { useSearchHistory } from './useSearchHistory';

const STORAGE_KEY = 'diamante.searchHistory.v1';

function SearchHistoryHarness(): ReactElement {
  const { entries } = useSearchHistory();
  return (
    <ul>
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
});
