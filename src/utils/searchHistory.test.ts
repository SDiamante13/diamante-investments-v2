import { describe, expect, test } from 'vitest';
import { recordSearch } from './searchHistory';

const apple = { symbol: 'AAPL', companyName: 'APPLE INC' };
const microsoft = { symbol: 'MSFT', companyName: 'MICROSOFT CORP' };

describe('recordSearch', () => {
  test('puts the newest search first', () => {
    expect(recordSearch([apple], microsoft)).toEqual([microsoft, apple]);
  });
});
