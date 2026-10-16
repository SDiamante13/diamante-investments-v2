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
});
