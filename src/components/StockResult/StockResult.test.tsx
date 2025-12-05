import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import StockResult from './StockResult';
import type { StockData } from '../../types/stock';
import styles from './StockResult.module.css';

describe('StockResult', () => {
  it('positive changes display in green', () => {
    const stockData: StockData = {
      symbol: 'AAPL',
      companyName: 'Apple Inc',
      currentPrice: 145.52,
      dollarChange: 2.35,
      percentChange: 1.64,
      openPrice: 144.2,
      high: 146.12,
      low: 143.89,
      volume: 52500000,
      marketCap: 2750000,
      peRatio: 30.5,
      weekHigh52: 198.23,
      weekLow52: 124.17,
    };

    render(<StockResult stockData={stockData} />);

    const dollarChangeEl = screen.getByText('+$2.35');
    const percentChangeEl = screen.getByText('+1.64%');

    expect(dollarChangeEl).toHaveClass(styles.positive);
    expect(percentChangeEl).toHaveClass(styles.positive);
  });

  it('negative changes display in red', () => {
    const stockData: StockData = {
      symbol: 'XYZ',
      companyName: 'Example Corp',
      currentPrice: 50.0,
      dollarChange: -1.25,
      percentChange: -2.44,
      openPrice: 51.0,
      high: 51.5,
      low: 49.8,
      volume: null,
      marketCap: null,
      peRatio: null,
      weekHigh52: null,
      weekLow52: null,
    };

    render(<StockResult stockData={stockData} />);

    const dollarChangeEl = screen.getByText('-$1.25');
    const percentChangeEl = screen.getByText('-2.44%');

    expect(dollarChangeEl).toHaveClass(styles.negative);
    expect(percentChangeEl).toHaveClass(styles.negative);
  });
});
