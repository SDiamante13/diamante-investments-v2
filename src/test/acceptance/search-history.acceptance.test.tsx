import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import App from '../../App';
import { mockAppleMetrics, mockAppleProfile, mockAppleQuote } from '../fixtures/mockStockData';
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

  test('user clicks a recent search and goes straight to the stock card', async () => {
    givenStocksAreAvailable([
      { symbol: 'AAPL', description: 'APPLE INC' },
      { symbol: 'MSFT', description: 'MICROSOFT CORP' },
    ]);
    render(<App />);
    await whenUserSearchesFor('AAPL');
    await whenUserSearchesFor('MSFT');
    whenUserFocusesTheSearchField();

    await whenUserClicksRecentSearch('AAPL');

    await thenUserSeesStockCard({ symbol: 'AAPL', values: ['$145.52', '$144.20', '$146.12', '$143.89', '$2.80T', '28.50'] });
    await thenUserSeesNoDropdownAfterDebounce('AAPL');
  });

  test('user sees only the five most recent searches', async () => {
    givenStocksAreAvailable([
      { symbol: 'AAPL', description: 'APPLE INC' },
      { symbol: 'MSFT', description: 'MICROSOFT CORP' },
      { symbol: 'GOOGL', description: 'ALPHABET INC-CL A' },
      { symbol: 'AMZN', description: 'AMAZON.COM INC' },
      { symbol: 'TSLA', description: 'TESLA INC' },
      { symbol: 'NVDA', description: 'NVIDIA CORP' },
    ]);
    render(<App />);

    await whenUserSearchesFor('AAPL');
    await whenUserSearchesFor('MSFT');
    await whenUserSearchesFor('GOOGL');
    await whenUserSearchesFor('AMZN');
    await whenUserSearchesFor('TSLA');
    await whenUserSearchesFor('NVDA');
    whenUserFocusesTheSearchField();

    await thenUserSeesRecentSearches(['NVDA', 'TSLA', 'AMZN', 'GOOGL', 'MSFT']);
  });
});

function givenStocksAreAvailable(stocks: Array<{ symbol: string; description: string }>): void {
  server.use(
    http.get(`${BASE_URL}/search`, ({ request }) => {
      const query = new URL(request.url).searchParams.get('q');
      const matches = stocks.filter((stock) => stock.symbol === query);
      return HttpResponse.json({ result: matches.map((stock) => ({ ...stock, displaySymbol: stock.symbol, type: 'Common Stock' })) });
    }),
    http.get(`${BASE_URL}/quote`, () => HttpResponse.json(mockAppleQuote)),
    http.get(`${BASE_URL}/stock/profile2`, () => HttpResponse.json(mockAppleProfile)),
    http.get(`${BASE_URL}/stock/metric`, () => HttpResponse.json(mockAppleMetrics))
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

async function whenUserClicksRecentSearch(symbol: string): Promise<void> {
  const recent = await screen.findByRole('region', { name: /recent searches/i });
  userEvent.click(within(recent).getByText(symbol));
}

async function thenUserSeesStockCard(expected: { symbol: string; values: string[] }): Promise<void> {
  await waitFor(() => expect(screen.getByRole('button', { name: `Watch ${expected.symbol}` })).toBeInTheDocument());
  expected.values.forEach((value) => expect(screen.getByText(value)).toBeInTheDocument());
}

async function thenUserSeesNoDropdownAfterDebounce(symbol: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  expect(screen.queryByRole('region', { name: /recent searches/i })).not.toBeInTheDocument();
  expect(screen.getAllByText(symbol)).toHaveLength(1);
}

async function thenUserSeesRecentSearches(symbols: string[]): Promise<void> {
  const recent = await screen.findByRole('region', { name: /recent searches/i });
  const rows = within(recent).getAllByRole('button');
  expect(rows.map((row) => within(row).getByText(/^[A-Z]+$/).textContent)).toEqual(symbols);
}
