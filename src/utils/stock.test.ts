import { describe, it, expect } from 'vitest';
import { normalizeTickerSymbol } from './stock';

describe('normalizeTickerSymbol', () => {
  it('converts lowercase to uppercase', () => {
    expect(normalizeTickerSymbol('aapl')).toBe('AAPL');
  });

  it('trims whitespace', () => {
    expect(normalizeTickerSymbol(' aapl ')).toBe('AAPL');
  });

  it('handles mixed case', () => {
    expect(normalizeTickerSymbol('AaPl')).toBe('AAPL');
  });
});
