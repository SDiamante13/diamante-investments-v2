import { describe, expect, test } from 'vitest';
import { recordSearch } from './searchHistory';

const apple = { symbol: 'AAPL', companyName: 'APPLE INC' };
const microsoft = { symbol: 'MSFT', companyName: 'MICROSOFT CORP' };

describe('recordSearch', () => {
  test('puts the newest search first', () => {
    expect(recordSearch([apple], microsoft)).toEqual([microsoft, apple]);
  });

  test('moves a repeated symbol to the top without duplicating it', () => {
    expect(recordSearch([microsoft, apple], { symbol: 'aapl', companyName: 'APPLE INC' })).toEqual([apple, microsoft]);
  });

  test('keeps only the five most recent searches', () => {
    const history = ['E', 'D', 'C', 'B', 'A'].map((symbol) => ({ symbol, companyName: `${symbol} CORP` }));

    const symbols = recordSearch(history, { symbol: 'F', companyName: 'F CORP' }).map((entry) => entry.symbol);

    expect(symbols).toEqual(['F', 'E', 'D', 'C', 'B']);
  });
});
