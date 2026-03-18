import { describe, it, expect } from 'vitest';
import {
  formatDollarChange,
  formatPercentChange,
  formatCurrency,
  formatMarketCap,
  formatNullable,
  calculateRangePosition,
} from './formatters';

describe('formatDollarChange', () => {
  it('prefixes positive values with +$', () => {
    expect(formatDollarChange(2.35)).toBe('+$2.35');
  });

  it('prefixes negative values with -$ and uses absolute value', () => {
    expect(formatDollarChange(-1.25)).toBe('-$1.25');
  });

  it('treats zero as positive', () => {
    expect(formatDollarChange(0)).toBe('+$0');
  });
});

describe('formatPercentChange', () => {
  it('prefixes positive values with + and appends %', () => {
    expect(formatPercentChange(1.64)).toBe('+1.64%');
  });

  it('keeps negative sign and appends %', () => {
    expect(formatPercentChange(-2.44)).toBe('-2.44%');
  });

  it('formats to two decimal places', () => {
    expect(formatPercentChange(3)).toBe('+3.00%');
  });
});

describe('formatCurrency', () => {
  it('formats number as dollar amount with two decimals', () => {
    expect(formatCurrency(145.5)).toBe('$145.50');
  });

  it('formats whole numbers with .00', () => {
    expect(formatCurrency(50)).toBe('$50.00');
  });
});

describe('formatMarketCap', () => {
  it('returns N/A for null', () => {
    expect(formatMarketCap(null)).toBe('N/A');
  });

  it('formats trillions (>= 1,000,000M)', () => {
    expect(formatMarketCap(2890000)).toBe('$2.89T');
  });

  it('formats billions (>= 1,000M)', () => {
    expect(formatMarketCap(1500)).toBe('$1.50B');
  });

  it('formats millions (< 1,000M)', () => {
    expect(formatMarketCap(750)).toBe('$750.00M');
  });
});

describe('formatNullable', () => {
  it('returns N/A for null', () => {
    expect(formatNullable(null)).toBe('N/A');
  });

  it('formats number to two decimal places', () => {
    expect(formatNullable(29.84)).toBe('29.84');
  });
});

describe('calculateRangePosition', () => {
  it('returns percentage position within range', () => {
    expect(calculateRangePosition(150, 100, 200)).toBe(50);
  });

  it('returns 0 at the low end', () => {
    expect(calculateRangePosition(100, 100, 200)).toBe(0);
  });

  it('returns 100 at the high end', () => {
    expect(calculateRangePosition(200, 100, 200)).toBe(100);
  });

  it('returns 50 when high equals low', () => {
    expect(calculateRangePosition(100, 100, 100)).toBe(50);
  });
});
