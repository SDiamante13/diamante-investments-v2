import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { describe, test } from 'vitest';
import App from '../../App';
import {
  mockAppleMetrics,
  mockAppleProfile,
  mockAppleQuote,
  mockAppleSearchResult,
  mockMultipleSearchResults,
} from '../fixtures/mockStockData';
import { server } from '../mocks/server';

const BASE_URL = 'https://finnhub.io/api/v1';

describe('Detailed Stock Metrics', () => {
  test('user selects a stock preview and sees current, open, high, low, market cap, and P/E', async () => {
    givenAppleStockDataIsAvailable();
    render(<App />);

    await whenUserSelectsApplePreview();

    await thenUserSees('$145.52');
    ['$144.20', '$146.12', '$143.89', '$2.80T', '28.50'].forEach((value) => expect(screen.getByText(value)).toBeInTheDocument());
  });

  test('user selects a stock preview and sees its current position within the 52-week range', async () => {
    givenAppleStockDataIsAvailable();
    render(<App />);

    await whenUserSelectsApplePreview();

    await thenUserSees('$124.17');
    expect(screen.getByText('$152.84')).toBeInTheDocument();
    expect(screen.getByRole('meter', { name: /current price is 74% through the 52-week range/i })).toBeInTheDocument();
  });

  test('user sees named unavailable fields when optional stock data cannot be loaded', async () => {
    givenAppleStockDataIsAvailable();
    server.use(
      http.get(`${BASE_URL}/stock/profile2`, () => HttpResponse.error()),
      http.get(`${BASE_URL}/stock/metric`, () => HttpResponse.error())
    );
    render(<App />);

    await whenUserSelectsApplePreview();

    await thenUserSees('Some data unavailable: Market cap, P/E ratio, 52-week range');
    expect(screen.getAllByText('N/A')).toHaveLength(3);
  });

  test('user sees a loading card instead of stale details while a new stock loads', async () => {
    givenDelayedSecondStock();
    render(<App />);

    await whenUserSelectsApplePreview();
    await thenUserSees('$145.52');
    await whenUserSelectsSecondPreview();

    expect(screen.getByRole('status', { name: /loading AAPD details/i })).toBeInTheDocument();
    expect(screen.queryByText('APPLE INC')).not.toBeInTheDocument();
    await thenUserSees('AAPD');
  });

  test('user sees normalized annual P/E when trailing basic P/E is unavailable', async () => {
    givenAppleStockDataIsAvailable();
    server.use(
      http.get(`${BASE_URL}/stock/metric`, () => HttpResponse.json({ metric: { ...mockAppleMetrics.metric, peBasicExclExtraTTM: 0 } }))
    );
    render(<App />);

    await whenUserSelectsApplePreview();

    await thenUserSees('27.90');
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

function givenDelayedSecondStock(): void {
  server.use(
    http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockMultipleSearchResults)),
    http.get(`${BASE_URL}/quote`, async ({ request }) => {
      if (new URL(request.url).searchParams.get('symbol') === 'AAPD') await delay(150);
      return HttpResponse.json(mockAppleQuote);
    })
  );
}

async function whenUserSelectsApplePreview(): Promise<void> {
  userEvent.type(screen.getByRole('textbox'), 'AAP');
  await thenUserSees('APPLE INC');
  userEvent.click(screen.getByText('AAPL').closest('div')!);
}

async function whenUserSelectsSecondPreview(): Promise<void> {
  userEvent.clear(screen.getByRole('textbox'));
  userEvent.type(screen.getByRole('textbox'), 'AAPD');
  await thenUserSees('DIREXION AAPL BEAR');
  userEvent.click(screen.getByText('AAPD').closest('div')!);
}

async function thenUserSees(pattern: RegExp | string): Promise<void> {
  await waitFor(() => expect(screen.getByText(pattern)).toBeInTheDocument(), { timeout: 600 });
}
