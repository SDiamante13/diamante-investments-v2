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
      quote: {
        currentPrice: 145.52,
        dollarChange: 2.35,
        percentChange: 1.64,
        open: 144.2,
        high: 146.12,
        low: 143.89,
      },
      profile: {
        marketCap: 2800000,
      },
      metrics: {
        peRatio: 28.5,
        yearHigh: 185.0,
        yearLow: 124.0,
      },
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
      quote: {
        currentPrice: 50.0,
        dollarChange: -1.25,
        percentChange: -2.44,
        open: 51.0,
        high: 52.0,
        low: 49.5,
      },
      profile: {
        marketCap: 1000,
      },
      metrics: {
        peRatio: null,
        yearHigh: 75.0,
        yearLow: 45.0,
      },
    };

    render(<StockResult stockData={stockData} />);

    const dollarChangeEl = screen.getByText('-$1.25');
    const percentChangeEl = screen.getByText('-2.44%');

    expect(dollarChangeEl).toHaveClass(styles.negative);
    expect(percentChangeEl).toHaveClass(styles.negative);
  });
});
