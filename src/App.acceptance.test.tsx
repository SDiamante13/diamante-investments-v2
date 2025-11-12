import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Story 1.1: Stock Search by Ticker Symbol', () => {
  it('user searches valid ticker and sees stock with symbol and company name', async () => {
    render(<App />);
    const searchInput = screen.getByRole('searchbox');
    await userEvent.type(searchInput, 'AAPL{Enter}');

    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
      expect(screen.getByText(/APPLE INC/i)).toBeInTheDocument();
    });
  });

  // [TEST] User searches invalid ticker and sees no results message

  // [TEST] Search results show current price with dollar and percentage change

  // [TEST] Positive changes display in green

  // [TEST] Negative changes display in red
});
