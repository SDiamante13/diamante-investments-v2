import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import App from '../../App';
import userEvent from '@testing-library/user-event';

const BASE_URL = 'https://finnhub.io/api/v1';

describe('Stock Discovery', () => {
  it('user searches valid ticker and sees stock data with symbol, company name, price, dollar change, and percent change', async () => {
    const searchResult = {
      count: 1,
      result: [
        {
          description: 'APPLE INC',
          displaySymbol: 'AAPL',
          symbol: 'AAPL',
          type: 'Common Stock',
        },
      ],
    };

    const quoteData = {
      c: 145.52,
      d: 2.35,
      dp: 1.64,
      h: 146.12,
      l: 143.89,
      o: 144.2,
      pc: 143.17,
      t: 1699564800,
    };

    server.use(
      http.get(`${BASE_URL}/search`, () => {
        return HttpResponse.json(searchResult);
      }),
      http.get(`${BASE_URL}/quote`, () => {
        return HttpResponse.json(quoteData);
      })
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
    const emptySearchResult = { count: 0, result: [] };

    server.use(
      http.get(`${BASE_URL}/search`, () => {
        return HttpResponse.json(emptySearchResult);
      })
    );

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'INVALID123');

    await waitFor(() => {
      expect(screen.getByText(/no matches found/i)).toBeInTheDocument();
    }, { timeout: 600 });
  });

  it('user types partial ticker and sees preview list with multiple matches', async () => {
    server.use(
      http.get(`${BASE_URL}/search`, () =>
        HttpResponse.json({
          result: [
            { symbol: 'AAPL', description: 'APPLE INC', displaySymbol: 'AAPL', type: 'Common Stock' },
            { symbol: 'AAPD', description: 'DIREXION AAPL BEAR', displaySymbol: 'AAPD', type: 'ETF' },
          ],
        })
      )
    );

    render(<App />);

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'AAP');

    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
    }, { timeout: 600 });

    expect(screen.getByText('APPLE INC')).toBeInTheDocument();
    expect(screen.getByText('AAPD')).toBeInTheDocument();
    expect(screen.getByText('DIREXION AAPL BEAR')).toBeInTheDocument();
  });

  it('user clicks preview item and sees full stock result with price', async () => {
    server.use(
      http.get(`${BASE_URL}/search`, ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q');

        if (query === 'AAP') {
          return HttpResponse.json({
            result: [
              { symbol: 'AAPL', description: 'APPLE INC', displaySymbol: 'AAPL', type: 'Common Stock' },
            ],
          });
        }

        return HttpResponse.json({
          result: [
            { symbol: 'AAPL', description: 'APPLE INC', displaySymbol: 'AAPL', type: 'Common Stock' },
          ],
        });
      }),
      http.get(`${BASE_URL}/quote`, () =>
        HttpResponse.json({
          c: 145.52,
          d: 2.35,
          dp: 1.64,
          h: 146.12,
          l: 143.89,
          o: 144.2,
          pc: 143.17,
          t: 1699564800,
        })
      )
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
});
