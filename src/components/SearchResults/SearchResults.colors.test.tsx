import { render, screen, waitFor } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import styles from './SearchResults.module.css';

const mockSuccessState = {
  status: 'success' as const,
  data: [{ symbol: 'AAPL', name: 'Apple Inc.', type: 'Common Stock', region: 'US', matchScore: '1.0' }],
};

function setupQuoteHandler(c: number, d: number, dp: number) {
  server.use(http.get('https://finnhub.io/api/v1/quote', () => HttpResponse.json({ c, d, dp })));
}

describe('SearchResults - Color Coding', () => {
  it('Positive changes show in green with upward indicator', async () => {
    setupQuoteHandler(145.52, 2.35, 1.64);
    render(<SearchResults state={mockSuccessState} />);
    await waitFor(() => {
      const changeElement = screen.getByText(/Daily Change:/);
      expect(changeElement).toBeInTheDocument();
      expect(changeElement).toHaveClass(styles.positive);
      expect(screen.getByText(/▲/)).toBeInTheDocument();
    });
  });

  it('Negative changes show in red with downward indicator', async () => {
    setupQuoteHandler(142.15, -3.02, -2.08);
    render(<SearchResults state={mockSuccessState} />);
    await waitFor(() => {
      const changeElement = screen.getByText(/Daily Change:/);
      expect(changeElement).toBeInTheDocument();
      expect(changeElement).toHaveClass(styles.negative);
      expect(screen.getByText(/▼/)).toBeInTheDocument();
    });
  });
});
