import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import App from '../../App';
import userEvent from '@testing-library/user-event';

const BASE_URL = 'https://finnhub.io/api/v1';

describe('Stock Discovery', () => {
  it('user searches valid ticker and sees stock data with symbol, company name, price, dollar change, and percent change', async () => {
    const searchResult = {
      count: 1,
      result: [
        {
          description: 'APPLE INC',
          displaySymbol: 'AAPL',
          symbol: 'AAPL',
          type: 'Common Stock',
        },
      ],
    };

    const quoteData = {
      c: 145.52,
      d: 2.35,
      dp: 1.64,
      h: 146.12,
      l: 143.89,
      o: 144.2,
      pc: 143.17,
      t: 1699564800,
    };

    server.use(
      http.get(`${BASE_URL}/search`, () => {
        return HttpResponse.json(searchResult);
      }),
      http.get(`${BASE_URL}/quote`, () => {
        return HttpResponse.json(quoteData);
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
    const emptySearchResult = { count: 0, result: [] };

    server.use(
      http.get(`${BASE_URL}/search`, () => {
        return HttpResponse.json(emptySearchResult);
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
