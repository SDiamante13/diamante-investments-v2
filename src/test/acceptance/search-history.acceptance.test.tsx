import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import App from '../../App';
import { mockAppleQuote } from '../fixtures/mockStockData';
import { server } from '../mocks/server';

const BASE_URL = 'https://finnhub.io/api/v1';

describe('Search history', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('user focuses the search field and sees recent stocks, most recent first', async () => {
    givenStocksAreAvailable([
      { symbol: 'AAPL', description: 'APPLE INC' },
      { symbol: 'MSFT', description: 'MICROSOFT CORP' },
      { symbol: 'GOOGL', description: 'ALPHABET INC-CL A' },
    ]);
    render(<App />);

    await whenUserSearchesFor('AAPL');
    await whenUserSearchesFor('MSFT');
    await whenUserSearchesFor('GOOGL');
    whenUserFocusesTheSearchField();

    await thenUserSeesRecentSearches(['GOOGL', 'MSFT', 'AAPL']);
  });
});

function givenStocksAreAvailable(stocks: Array<{ symbol: string; description: string }>): void {
  server.use(
    http.get(`${BASE_URL}/search`, ({ request }) => {
      const query = new URL(request.url).searchParams.get('q');
      const matches = stocks.filter((stock) => stock.symbol === query);
      return HttpResponse.json({ result: matches.map((stock) => ({ ...stock, displaySymbol: stock.symbol, type: 'Common Stock' })) });
    }),
    http.get(`${BASE_URL}/quote`, () => HttpResponse.json(mockAppleQuote))
  );
}

async function whenUserSearchesFor(symbol: string): Promise<void> {
  const input = screen.getByRole('textbox');
  userEvent.clear(input);
  userEvent.type(input, `${symbol}{enter}`);
  await waitFor(() => expect(screen.getByRole('button', { name: `Watch ${symbol}` })).toBeInTheDocument());
}

function whenUserFocusesTheSearchField(): void {
  userEvent.clear(screen.getByRole('textbox'));
  userEvent.click(screen.getByRole('textbox'));
}

async function thenUserSeesRecentSearches(symbols: string[]): Promise<void> {
  const recent = await screen.findByRole('region', { name: /recent searches/i });
  const rows = within(recent).getAllByRole('button');
  expect(rows.map((row) => within(row).getByText(/^[A-Z]+$/).textContent)).toEqual(symbols);
}
