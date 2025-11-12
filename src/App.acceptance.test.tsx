import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from './test/mswServer';
import { mockSearchResponses, mockQuotes } from './test/testData';
import App from './App';

describe('Stock Search by Ticker Symbol', () => {
  beforeEach(() => {
    server.use(
      http.get('https://finnhub.io/api/v1/search', ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q');
        const response = query ? mockSearchResponses[query] : undefined;
        return HttpResponse.json(response || { count: 0, result: [] });
      }),
      http.get('https://finnhub.io/api/v1/quote', ({ request }) => {
        const url = new URL(request.url);
        const symbol = url.searchParams.get('symbol');
        const response = symbol ? mockQuotes[symbol] : undefined;
        return HttpResponse.json(response || {});
      })
    );
  });

  it('user searches valid ticker and sees stock with symbol and company name', async () => {
    render(<App />);
    const searchInput = screen.getByRole('searchbox');
    await userEvent.type(searchInput, 'AAPL{Enter}');

    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
      expect(screen.getByText(/APPLE INC/i)).toBeInTheDocument();
    });
  });

  it('user searches invalid ticker and sees no results message', async () => {
    render(<App />);
    const searchInput = screen.getByRole('searchbox');
    userEvent.type(searchInput, 'INVALID123{Enter}');

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });

  it.skip('search results show current price with dollar and percentage change', async () => {
    render(<App />);
    const searchInput = screen.getByRole('searchbox');
    userEvent.type(searchInput, 'AAPL{Enter}');

    await waitFor(() => {
      expect(screen.getByText('$145.52')).toBeInTheDocument();
      expect(screen.getByText('+$2.35')).toBeInTheDocument();
      expect(screen.getByText('+1.64%')).toBeInTheDocument();
    });
  });

  // [TEST] Positive changes display in green

  // [TEST] Negative changes display in red
});
