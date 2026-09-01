import { describe, expect, test } from 'vitest';
import type { SearchHistoryEntry } from '../types/searchHistory';
import { excludeSymbols, recordSearch } from './searchHistory';

const apple: SearchHistoryEntry = { symbol: 'AAPL', companyName: 'APPLE INC' };
const microsoft: SearchHistoryEntry = { symbol: 'MSFT', companyName: 'MICROSOFT CORP' };

describe('recordSearch', () => {
  test('puts the newest search at the top', () => {
    expect(recordSearch([apple], microsoft, 5)).toEqual([microsoft, apple]);
  });

  test('moves a repeated search to the top instead of duplicating it', () => {
    expect(recordSearch([microsoft, apple], apple, 5)).toEqual([apple, microsoft]);
  });

  test('treats a differently-cased symbol as the same search', () => {
    expect(recordSearch([apple], { symbol: 'aapl', companyName: 'APPLE INC' }, 5)).toEqual([apple]);
  });

  test('keeps only the newest entries up to the limit', () => {
    const older = [microsoft, apple];

    const entries = recordSearch(older, { symbol: 'GOOGL', companyName: 'ALPHABET INC' }, 2);

    expect(entries).toEqual([{ symbol: 'GOOGL', companyName: 'ALPHABET INC' }, microsoft]);
  });
});

describe('excludeSymbols', () => {
  test('drops entries whose symbol is already listed elsewhere', () => {
    expect(excludeSymbols([microsoft, apple], ['aapl'])).toEqual([microsoft]);
  });
});
