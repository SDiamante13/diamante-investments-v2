import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import App from '../../App';
import { mockAppleMetrics, mockAppleProfile, mockAppleQuote, mockAppleSearchResult } from '../fixtures/mockStockData';
import { server } from '../mocks/server';

const BASE_URL = 'https://finnhub.io/api/v1';

describe('Watchlist from stock card', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('user watches a selected stock and sees the snapshot in the watchlist tab', async () => {
    givenAppleStockDataIsAvailable();
    render(<App />);

    await whenUserSelectsApplePreview();
    await thenUserSees('$145.52');
    userEvent.click(screen.getByRole('button', { name: /watch AAPL/i }));

    await thenUserSees('★ Watching');
    expect(screen.getByRole('status')).toHaveTextContent('Added AAPL to watchlist');

    userEvent.click(screen.getByRole('tab', { name: /watchlist/i }));

    await thenUserSeesWatchlistRow({
      symbol: 'AAPL',
      company: 'APPLE INC',
      price: '$145.52',
      change: '+$2.35',
      percent: '+1.64%',
    });
  });

  test('user removes a watched stock from the selected stock card', async () => {
    givenAppleStockDataIsAvailable();
    render(<App />);

    await whenUserSelectsApplePreview();
    await thenUserSees('$145.52');
    userEvent.click(screen.getByRole('button', { name: /watch AAPL/i }));
    await thenUserSees('★ Watching');
    userEvent.click(screen.getByRole('tab', { name: /watchlist/i }));
    await thenUserSees('AAPL');
    userEvent.click(screen.getByRole('tab', { name: /search/i }));

    userEvent.click(screen.getByRole('button', { name: /stop watching AAPL/i }));

    await thenUserSees('☆ Watch');
    expect(screen.getByRole('status')).toHaveTextContent('Removed AAPL from watchlist');
    userEvent.click(screen.getByRole('tab', { name: /watchlist/i }));
    await thenUserSees('No stocks watched yet.');
    expect(screen.queryByText('AAPL')).not.toBeInTheDocument();
  });
});

function givenAppleStockDataIsAvailable(): void {
  server.use(
    http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockAppleSearchResult)),
    http.get(`${BASE_URL}/quote`, () => HttpResponse.json(mockAppleQuote)),
    http.get(`${BASE_URL}/stock/profile2`, () => HttpResponse.json(mockAppleProfile)),
    http.get(`${BASE_URL}/stock/metric`, () => HttpResponse.json(mockAppleMetrics))
  );
}

async function whenUserSelectsApplePreview(): Promise<void> {
  userEvent.type(screen.getByRole('textbox'), 'AAP');
  await thenUserSees('APPLE INC');
  userEvent.click(screen.getByText('AAPL').closest('div')!);
}

async function thenUserSees(pattern: RegExp | string): Promise<void> {
  await waitFor(() => expect(screen.getByText(pattern)).toBeInTheDocument(), { timeout: 600 });
}

async function thenUserSeesWatchlistRow(expected: {
  symbol: string;
  company: string;
  price: string;
  change: string;
  percent: string;
}): Promise<void> {
  await thenUserSees(expected.symbol);
  expect(screen.getByText(expected.company)).toBeInTheDocument();
  expect(screen.getByText(expected.price)).toBeInTheDocument();
  expect(screen.getByText(expected.change)).toBeInTheDocument();
  expect(screen.getByText(expected.percent)).toBeInTheDocument();
}
