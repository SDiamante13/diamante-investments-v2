import { describe, expect, test } from 'vitest';
import type { SearchHistoryEntry } from '../types/searchHistory';
import { recordSearch } from './searchHistory';

const apple: SearchHistoryEntry = { symbol: 'AAPL', companyName: 'APPLE INC' };
const microsoft: SearchHistoryEntry = { symbol: 'MSFT', companyName: 'MICROSOFT CORP' };

describe('recordSearch', () => {
  test('puts the newest search at the top', () => {
    expect(recordSearch([apple], microsoft)).toEqual([microsoft, apple]);
  });

  test('moves a repeated search to the top instead of duplicating it', () => {
    expect(recordSearch([microsoft, apple], apple)).toEqual([apple, microsoft]);
  });
});
