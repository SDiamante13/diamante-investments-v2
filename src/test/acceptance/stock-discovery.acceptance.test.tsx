import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('Stock Discovery', () => {
  it('user searches valid ticker and sees stock data with symbol, company name, price, dollar change, and percent change', async () => {
    const stockData = {
      symbol: 'AAPL',
      name: 'APPLE INC',
      price: 145.52,
      change: 2.35,
      changePercent: 1.64,
    };

    server.use(
      http.get('/api/stocks/AAPL', () => {
        return HttpResponse.json(stockData);
      })
    );

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'AAPL{enter}');

    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
    });

    expect(screen.getByText('APPLE INC')).toBeInTheDocument();
    expect(screen.getByText('$145.52')).toBeInTheDocument();
    expect(screen.getByText('+$2.35')).toBeInTheDocument();
    expect(screen.getByText('+1.64%')).toBeInTheDocument();
  });

  it('user searches invalid ticker and sees no results message', async () => {
    server.use(
      http.get('/api/stocks/INVALID123', () => {
        return HttpResponse.json({ error: 'Not found' }, { status: 404 });
      })
    );

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'INVALID123{enter}');

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });
});
