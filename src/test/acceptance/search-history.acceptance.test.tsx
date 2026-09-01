import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import App from '../../App';
import { mockAppleQuote } from '../fixtures/mockStockData';
import { server } from '../mocks/server';

const BASE_URL = 'https://finnhub.io/api/v1';

const COMPANY_NAMES: Record<string, string> = {
  AAPL: 'APPLE INC',
  MSFT: 'MICROSOFT CORP',
  GOOGL: 'ALPHABET INC',
  AMZN: 'AMAZON.COM INC',
  META: 'META PLATFORMS INC',
  NVDA: 'NVIDIA CORP',
};

describe('Search history', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('user focuses the search field and sees recently searched stocks with the most recent first', async () => {
    givenStocksAreSearchable();
    render(<App />);

    await whenUserSearchesAndSelects('AAPL');
    await whenUserSearchesAndSelects('MSFT');
    whenUserFocusesTheSearchField();

    await thenRecentSearchesAre(['MSFT', 'AAPL']);
  });

  test('user clicks a recent search and sees the stock card without the preview list', async () => {
    givenStocksAreSearchable();
    render(<App />);

    await whenUserSearchesAndSelects('AAPL');
    await whenUserSearchesAndSelects('MSFT');
    whenUserFocusesTheSearchField();
    await thenRecentSearchesAre(['MSFT', 'AAPL']);

    whenUserClicksRecentSearch('AAPL');

    await thenUserSeesStockCardFor({ symbol: 'AAPL', company: 'APPLE INC', price: '$145.52' });
    expect(screen.queryByRole('region', { name: 'Matches' })).not.toBeInTheDocument();
  });

  test('user refocuses after picking a recent search and is not shown matches for the filled-in symbol', async () => {
    givenStocksAreSearchable();
    render(<App />);

    await whenUserSearchesAndSelects('AAPL');
    whenUserFocusesTheSearchField();
    await thenRecentSearchesAre(['AAPL']);
    whenUserClicksRecentSearch('AAPL');
    await thenUserSeesStockCardFor({ symbol: 'AAPL', company: 'APPLE INC', price: '$145.52' });

    userEvent.click(screen.getByRole('textbox'));

    await thenRecentSearchesAre(['AAPL']);
    expect(screen.queryByRole('region', { name: 'Matches' })).not.toBeInTheDocument();
  });

  test('user searches six stocks and sees only the five most recent', async () => {
    givenStocksAreSearchable();
    render(<App />);

    for (const symbol of ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA']) {
      await whenUserSearchesAndSelects(symbol);
    }
    whenUserFocusesTheSearchField();

    await thenRecentSearchesAre(['NVDA', 'META', 'AMZN', 'GOOGL', 'MSFT']);
  }, 20000);
});

function givenStocksAreSearchable(): void {
  server.use(
    http.get(`${BASE_URL}/search`, ({ request }) => {
      const symbol = (new URL(request.url).searchParams.get('q') ?? '').toUpperCase();
      const description = COMPANY_NAMES[symbol];
      const result = description ? [{ symbol, description, displaySymbol: symbol, type: 'Common Stock' }] : [];
      return HttpResponse.json({ result });
    }),
    http.get(`${BASE_URL}/quote`, () => HttpResponse.json(mockAppleQuote))
  );
}

async function whenUserSearchesAndSelects(symbol: string): Promise<void> {
  const searchField = screen.getByRole('textbox');
  userEvent.clear(searchField);
  userEvent.type(searchField, symbol);
  await waitFor(() => expect(screen.getByText(COMPANY_NAMES[symbol])).toBeInTheDocument(), { timeout: 600 });
  userEvent.click(screen.getByText(symbol));
  await waitFor(() => expect(screen.getByText('$145.52')).toBeInTheDocument(), { timeout: 600 });
}

function whenUserFocusesTheSearchField(): void {
  const searchField = screen.getByRole('textbox');
  userEvent.clear(searchField);
  userEvent.click(searchField);
}

function whenUserClicksRecentSearch(symbol: string): void {
  const recent = screen.getByRole('region', { name: 'Recent' });
  userEvent.click(within(recent).getByText(symbol));
}

async function thenUserSeesStockCardFor(expected: { symbol: string; company: string; price: string }): Promise<void> {
  const card = await screen.findByRole('article', { name: `${expected.symbol} stock card` }, { timeout: 600 });
  expect(within(card).getByText(expected.company)).toBeInTheDocument();
  expect(within(card).getByText(expected.price)).toBeInTheDocument();
}

async function thenRecentSearchesAre(expected: string[]): Promise<void> {
  const recent = await screen.findByRole('region', { name: 'Recent' }, { timeout: 600 });
  const tickerShapedText = /^[A-Z]+$/;
  const shownSymbols = within(recent).getAllByText(tickerShapedText);
  expect(shownSymbols.map((symbol) => symbol.textContent)).toEqual(expected);
}
