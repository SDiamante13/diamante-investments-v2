import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import { mockAppleSearchResult, mockAppleQuote, mockMultipleSearchResults, mockEmptySearchResult } from '../fixtures/mockStockData';

const BASE_URL = 'https://finnhub.io/api/v1';

describe('Stock Discovery', () => {
  it('user searches valid ticker and sees stock data with symbol, company name, price, dollar change, and percent change', async () => {
    server.use(
      http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockAppleSearchResult)),
      http.get(`${BASE_URL}/quote`, () => HttpResponse.json(mockAppleQuote))
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
    server.use(http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockEmptySearchResult)));

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'INVALID123');

    await waitFor(
      () => {
        expect(screen.getByText(/no matches found/i)).toBeInTheDocument();
      },
      { timeout: 600 }
    );
  });

  it('user types partial ticker and sees preview list with multiple matches', async () => {
    server.use(http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockMultipleSearchResults)));

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'AAP');

    await waitFor(
      () => {
        expect(screen.getByText('AAPL')).toBeInTheDocument();
      },
      { timeout: 600 }
    );

    expect(screen.getByText('APPLE INC')).toBeInTheDocument();
    expect(screen.getByText('AAPD')).toBeInTheDocument();
    expect(screen.getByText('DIREXION AAPL BEAR')).toBeInTheDocument();
  });

  it('user clicks preview item and sees full stock result with price', async () => {
    server.use(
      http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockAppleSearchResult)),
      http.get(`${BASE_URL}/quote`, () => HttpResponse.json(mockAppleQuote))
    );

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'AAP');

    await waitFor(() => {
      expect(screen.getByText('APPLE INC')).toBeInTheDocument();
    });

    const previewItem = screen.getByText('AAPL').closest('div');
    await userEvent.click(previewItem!);

    await waitFor(() => {
      expect(screen.getByText('$145.52')).toBeInTheDocument();
    });

    expect(screen.getByText('+$2.35')).toBeInTheDocument();
    expect(screen.getByText('+1.64%')).toBeInTheDocument();
  });

  it('hides preview dropdown when user submits search form', async () => {
    server.use(
      http.get(`${BASE_URL}/search`, () => HttpResponse.json(mockAppleSearchResult)),
      http.get(`${BASE_URL}/quote`, () => HttpResponse.json(mockAppleQuote))
    );

    render(<App />);
    const searchInput = screen.getByRole('textbox');

    await userEvent.type(searchInput, 'AAP');

    await waitFor(
      () => {
        expect(screen.getByText('APPLE INC')).toBeInTheDocument();
      },
      { timeout: 600 }
    );

    await userEvent.type(searchInput, 'L{enter}');

    await waitFor(() => {
      expect(screen.getByText('$145.52')).toBeInTheDocument();
    });

    const appleTexts = screen.queryAllByText('APPLE INC');
    expect(appleTexts.length).toBe(1);
  });
});
