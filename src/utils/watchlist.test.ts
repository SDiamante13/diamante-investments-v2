import { describe, expect, test } from 'vitest';
import type { WatchlistItem } from '../types/watchlist';
import { upsertWatchlistItem } from './watchlist';

describe('watchlist helpers', () => {
  test('upsert updates an existing symbol instead of duplicating it', () => {
    const staleApple: WatchlistItem = {
      symbol: 'AAPL',
      companyName: 'APPLE INC',
      currentPrice: 145.52,
      dollarChange: 2.35,
      percentChange: 1.64,
    };
    const latestApple: WatchlistItem = {
      symbol: 'aapl',
      companyName: 'APPLE INC',
      currentPrice: 150.24,
      dollarChange: 7.07,
      percentChange: 4.94,
    };

    const items = upsertWatchlistItem([staleApple], latestApple);

    expect(items).toEqual([{ ...latestApple, symbol: 'AAPL' }]);
  });
});
