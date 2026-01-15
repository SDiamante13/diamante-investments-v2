import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import StockMetrics from './StockMetrics';
import type { StockData } from '../../types/stock';

describe('StockMetrics', () => {
  it('displays N/A when P/E ratio is null', () => {
    const data: Pick<StockData, 'quote' | 'profile' | 'metrics'> = {
      quote: {
        currentPrice: 50.0,
        dollarChange: 1.0,
        percentChange: 2.0,
        open: 49.0,
        high: 51.0,
        low: 48.5,
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

    render(<StockMetrics data={data} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('formats market cap with T suffix for trillions', () => {
    const data: Pick<StockData, 'quote' | 'profile' | 'metrics'> = {
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

    render(<StockMetrics data={data} />);

    expect(screen.getByText('2.8T')).toBeInTheDocument();
  });

  it('formats market cap with B suffix for billions', () => {
    const data: Pick<StockData, 'quote' | 'profile' | 'metrics'> = {
      quote: {
        currentPrice: 50.0,
        dollarChange: 1.0,
        percentChange: 2.0,
        open: 49.0,
        high: 51.0,
        low: 48.5,
      },
      profile: {
        marketCap: 1500,
      },
      metrics: {
        peRatio: 15.0,
        yearHigh: 75.0,
        yearLow: 45.0,
      },
    };

    render(<StockMetrics data={data} />);

    expect(screen.getByText('1.5B')).toBeInTheDocument();
  });
});
