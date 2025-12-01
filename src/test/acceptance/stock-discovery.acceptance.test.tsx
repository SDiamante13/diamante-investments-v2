import { render, screen, waitFor } from '@testing-library/react';
import { describe, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import { mockAppleSearchResult, mockAppleQuote, mockMultipleSearchResults, mockEmptySearchResult } from '../fixtures/mockStockData';
import { FinnhubQuote, FinnhubSearchResponse } from '../../types/stock.ts';

const BASE_URL = 'https://finnhub.io/api/v1';

describe('Stock Discovery', () => {
  test('user searches valid ticker and sees stock data with symbol, company name, price, dollar change, and percent change', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserSearchesFor('AAPL');

    await thenUserSeesStockDetails({
      symbol: 'AAPL',
      company: 'APPLE INC',
      price: '$145.52',
      change: '+$2.35',
      percent: '+1.64%',
    });
  });

  test('user searches invalid ticker and sees no matches message preview', async () => {
    givenSearchReturnsNoMatches();
    render(<App />);

    whenUserTypesInSearch('INVALID123');

    await thenUserSeesMessage(/no matches found/i);
  });

  test('user types partial ticker and sees preview list with multiple matches', async () => {
    givenSearchReturnsMultipleMatches(mockMultipleSearchResults);
    render(<App />);

    whenUserTypesInSearch('AAP');

    await thenUserSeesSearchResults([
      { symbol: 'AAPL', description: 'APPLE INC' },
      { symbol: 'AAPD', description: 'DIREXION AAPL BEAR' },
    ]);
  });

  test('user clicks preview item and sees full stock result with price', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserTypesInSearch('AAP');
    await thenUserSeesMessage('APPLE INC');
    whenUserClicksPreviewItem('AAPL');

    await thenUserSeesStockDetails({
      symbol: 'AAPL',
      company: 'APPLE INC',
      price: '$145.52',
      change: '+$2.35',
      percent: '+1.64%',
    });
  });

  test('user submits unknown stock and sees no results found message', async () => {
    givenSearchReturnsNoMatches();
    render(<App />);

    whenUserSearchesFor('UNKNOWN');

    await thenUserSeesMessage(/no results found/i);
  });
});

function givenStockDataIsAvailableFor(searchResult: FinnhubSearchResponse, stockQuote: FinnhubQuote) {
  server.use(
    http.get(`${BASE_URL}/search`, () => HttpResponse.json(searchResult)),
    http.get(`${BASE_URL}/quote`, () => HttpResponse.json(stockQuote))
  );
}

function givenSearchReturnsNoMatches(): void {
  server.use(http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockEmptySearchResult)));
}

function givenSearchReturnsMultipleMatches(results: FinnhubSearchResponse): void {
  server.use(http.get(`${BASE_URL}/search`, () => HttpResponse.json(results)));
}

function whenUserSearchesFor(ticker: string): void {
  const searchInput = screen.getByRole('textbox');
  userEvent.type(searchInput, `${ticker}{enter}`);
}

function whenUserTypesInSearch(partial: string): void {
  const searchInput = screen.getByRole('textbox');
  userEvent.type(searchInput, partial);
}

function whenUserClicksPreviewItem(symbol: string): void {
  const previewItem = screen.getByText(symbol).closest('div');
  userEvent.click(previewItem!);
}

async function thenUserSeesStockDetails(expected: {
  symbol: string;
  company: string;
  price: string;
  change: string;
  percent: string;
}): Promise<void> {
  await waitFor(() => {
    expect(screen.getByText(expected.symbol)).toBeInTheDocument();
  });

  expect(screen.getByText(expected.company)).toBeInTheDocument();
  expect(screen.getByText(expected.price)).toBeInTheDocument();
  expect(screen.getByText(expected.change)).toBeInTheDocument();
  expect(screen.getByText(expected.percent)).toBeInTheDocument();
}

async function thenUserSeesMessage(pattern: RegExp | string): Promise<void> {
  await waitFor(
    () => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    },
    { timeout: 600 }
  );
}

async function thenUserSeesSearchResults(results: Array<{ symbol: string; description: string }>): Promise<void> {
  await waitFor(
    () => {
      expect(screen.getByText(results[0].symbol)).toBeInTheDocument();
    },
    { timeout: 600 }
  );

  results.forEach(({ symbol, description }) => {
    expect(screen.getByText(symbol)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
}
