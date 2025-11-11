import { render, screen, waitFor } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

const mockSuccessState = {
  status: 'success' as const,
  data: [{ symbol: 'AAPL', name: 'Apple Inc.', type: 'Common Stock', region: 'US', matchScore: '1.0' }],
};

function setupQuoteHandler(c: number, d: number, dp: number) {
  server.use(http.get('https://finnhub.io/api/v1/quote', () => HttpResponse.json({ c, d, dp })));
}

describe('SearchResults - Basic Display', () => {
  it('Search results display symbol and company name', () => {
    render(<SearchResults state={mockSuccessState} />);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
  });

  it('Search results display current price after loading', async () => {
    setupQuoteHandler(145.52, 2.35, 1.64);
    render(<SearchResults state={mockSuccessState} />);
    await waitFor(() => expect(screen.getByText('$145.52')).toBeInTheDocument());
  });

  it('Search results display both dollar and percentage change together', async () => {
    setupQuoteHandler(145.52, 2.35, 1.64);
    render(<SearchResults state={mockSuccessState} />);
    await waitFor(() => {
      expect(screen.getByText(/Daily Change:/)).toBeInTheDocument();
      expect(screen.getByText(/\+\$2\.35/)).toBeInTheDocument();
      expect(screen.getByText(/\+1\.64%/)).toBeInTheDocument();
    });
  });

  it('Search results remain visible while price data loads', () => {
    render(<SearchResults state={mockSuccessState} />);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.queryByText(/Daily Change:/)).not.toBeInTheDocument();
  });
});
