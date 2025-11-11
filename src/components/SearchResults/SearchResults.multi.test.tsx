import { render, screen, waitFor } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

describe('SearchResults - Multiple Stocks', () => {
  it('Multiple search results each load their own price data', async () => {
    server.use(
      http.get('https://finnhub.io/api/v1/quote', ({ request }) => {
        const url = new URL(request.url);
        const symbol = url.searchParams.get('symbol');
        if (symbol === 'AAPL') return HttpResponse.json({ c: 145.52, d: 2.35, dp: 1.64 });
        if (symbol === 'MSFT') return HttpResponse.json({ c: 330.45, d: -1.2, dp: -0.36 });
        return HttpResponse.json({ c: 0, d: 0, dp: 0 });
      })
    );

    const multiState = {
      status: 'success' as const,
      data: [
        { symbol: 'AAPL', name: 'Apple Inc.', type: 'Common Stock', region: 'US', matchScore: '1.0' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', type: 'Common Stock', region: 'US', matchScore: '1.0' },
      ],
    };

    render(<SearchResults state={multiState} />);
    await waitFor(() => {
      expect(screen.getByText('$145.52')).toBeInTheDocument();
      expect(screen.getByText('$330.45')).toBeInTheDocument();
    });
  });
});
