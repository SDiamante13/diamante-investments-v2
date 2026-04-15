import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import {
  mockAppleSearchResult,
  mockAppleQuote,
  mockMultipleSearchResults,
  mockEmptySearchResult,
  mockAppleProfile,
  mockAppleMetrics,
} from '../fixtures/mockStockData';
import { FinnhubQuote, FinnhubSearchResponse } from '../../services/finnhub/types.ts';
import {
  thenUserSeesStockDetails,
  thenUserSeesDetailedMetrics,
  thenUserSees52WeekRange,
  thenUserSeesMessage,
  thenUserSeesSearchResults,
} from './acceptance-helpers';

const BASE_URL = 'https://finnhub.io/api/v1';

describe('Stock Discovery', () => {
  test('user searches valid ticker and sees stock data with symbol, company name, price, dollar change, and percent change', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserSearchesFor('AAPL');

    await thenUserSeesStockDetails({
      symbol: 'AAPL',
      company: 'Apple Inc',
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
      company: 'Apple Inc',
      price: '$145.52',
      change: '+$2.35',
      percent: '+1.64%',
    });
  });

  test('user clicks preview item and sees open, high, low, market cap, and PE ratio on stock card', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserTypesInSearch('AAP');
    await thenUserSeesMessage('APPLE INC');
    whenUserClicksPreviewItem('AAPL');

    await thenUserSeesDetailedMetrics({
      open: '$144.20',
      high: '$146.12',
      low: '$143.89',
      marketCap: '$2.80T',
      peRatio: '28.50',
    });
  });

  test('user clicks preview item and sees 52-week high, low, and visual range indicator on stock card', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserTypesInSearch('AAP');
    await thenUserSeesMessage('APPLE INC');
    whenUserClicksPreviewItem('AAPL');

    await thenUserSees52WeekRange({
      low: '$124.17',
      high: '$152.84',
      positionPercent: 74,
    });
  });

  test('user submits unknown stock and sees no results found message', async () => {
    givenSearchReturnsNoMatches();
    render(<App />);

    whenUserSearchesFor('UNKNOWN');

    await thenUserSeesMessage(/no results found/i);
  });
});

function givenStockDataIsAvailableFor(searchResult: FinnhubSearchResponse, stockQuote: FinnhubQuote): void {
  server.use(
    http.get(`${BASE_URL}/search`, () => HttpResponse.json(searchResult)),
    http.get(`${BASE_URL}/quote`, () => HttpResponse.json(stockQuote)),
    http.get(`${BASE_URL}/stock/profile2`, () => HttpResponse.json(mockAppleProfile)),
    http.get(`${BASE_URL}/stock/metric`, () => HttpResponse.json(mockAppleMetrics))
  );
}

function givenSearchReturnsNoMatches(): void {
  server.use(http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockEmptySearchResult)));
}

function givenSearchReturnsMultipleMatches(results: FinnhubSearchResponse): void {
  server.use(http.get(`${BASE_URL}/search`, () => HttpResponse.json(results)));
}

function whenUserSearchesFor(ticker: string): void {
  userEvent.type(screen.getByRole('textbox'), `${ticker}{enter}`);
}

function whenUserTypesInSearch(partial: string): void {
  userEvent.type(screen.getByRole('textbox'), partial);
}

function whenUserClicksPreviewItem(symbol: string): void {
  userEvent.click(screen.getByText(symbol).closest('div')!);
}
