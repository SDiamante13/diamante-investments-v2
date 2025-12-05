import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import type { FinnhubQuote, FinnhubSearchResponse, FinnhubProfile2, FinnhubMetric, FinnhubCandle } from '../../services/finnhub/types';
import { mockEmptySearchResult } from '../fixtures/mockStockData';

const BASE_URL = 'https://finnhub.io/api/v1';

export function givenStockDataIsAvailableFor(searchResult: FinnhubSearchResponse, stockQuote: FinnhubQuote): void {
  server.use(
    http.get(`${BASE_URL}/search`, () => HttpResponse.json(searchResult)),
    http.get(`${BASE_URL}/quote`, () => HttpResponse.json(stockQuote)),
    http.get(`${BASE_URL}/stock/profile2`, () => new HttpResponse(null, { status: 404 })),
    http.get(`${BASE_URL}/stock/metric`, () => new HttpResponse(null, { status: 404 })),
    http.get(`${BASE_URL}/stock/candle`, () => new HttpResponse(null, { status: 404 }))
  );
}

export function givenSearchReturnsNoMatches(): void {
  server.use(http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockEmptySearchResult)));
}

export function givenSearchReturnsMultipleMatches(results: FinnhubSearchResponse): void {
  server.use(http.get(`${BASE_URL}/search`, () => HttpResponse.json(results)));
}

export function givenStockDataWithMetrics(
  searchResult: FinnhubSearchResponse,
  quote: FinnhubQuote,
  profile2: FinnhubProfile2,
  metric: FinnhubMetric,
  candle: FinnhubCandle
): void {
  server.use(
    http.get(`${BASE_URL}/search`, () => HttpResponse.json(searchResult)),
    http.get(`${BASE_URL}/quote`, () => HttpResponse.json(quote)),
    http.get(`${BASE_URL}/stock/profile2`, () => HttpResponse.json(profile2)),
    http.get(`${BASE_URL}/stock/metric`, () => HttpResponse.json(metric)),
    http.get(`${BASE_URL}/stock/candle`, () => HttpResponse.json(candle))
  );
}

export function whenUserSearchesFor(ticker: string): void {
  const searchInput = screen.getByRole('textbox');
  userEvent.type(searchInput, `${ticker}{enter}`);
}

export function whenUserTypesInSearch(partial: string): void {
  const searchInput = screen.getByRole('textbox');
  userEvent.type(searchInput, partial);
}

export function whenUserClicksPreviewItem(symbol: string): void {
  const previewItem = screen.getByText(symbol).closest('div');
  userEvent.click(previewItem!);
}

export async function thenUserSeesStockDetails(expected: {
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

export async function thenUserSeesMessage(pattern: RegExp | string): Promise<void> {
  await waitFor(
    () => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    },
    { timeout: 600 }
  );
}

export async function thenUserSeesSearchResults(results: Array<{ symbol: string; description: string }>): Promise<void> {
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

export async function thenUserSeesDetailedMetrics(expected: {
  open: string;
  high: string;
  low: string;
  volume: string;
  marketCap: string;
  peRatio: string;
}): Promise<void> {
  await waitFor(() => {
    expect(screen.getByText(expected.open)).toBeInTheDocument();
  });

  expect(screen.getByText(expected.high)).toBeInTheDocument();
  expect(screen.getByText(expected.low)).toBeInTheDocument();
  expect(screen.getByText(expected.volume)).toBeInTheDocument();
  expect(screen.getByText(expected.marketCap)).toBeInTheDocument();
  expect(screen.getByText(expected.peRatio)).toBeInTheDocument();
}

export async function thenUserSees52WeekRange(expected: { high: string; low: string }): Promise<void> {
  await waitFor(() => {
    expect(screen.getByText(expected.high)).toBeInTheDocument();
  });

  expect(screen.getByText(expected.low)).toBeInTheDocument();
}
