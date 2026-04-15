import { screen, waitFor } from '@testing-library/react';

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

export async function thenUserSeesDetailedMetrics(expected: {
  open: string;
  high: string;
  low: string;
  marketCap: string;
  peRatio: string;
}): Promise<void> {
  await waitFor(() => {
    expect(screen.getByText(expected.open)).toBeInTheDocument();
  });
  expect(screen.getByText(expected.high)).toBeInTheDocument();
  expect(screen.getByText(expected.low)).toBeInTheDocument();
  expect(screen.getByText(expected.marketCap)).toBeInTheDocument();
  expect(screen.getByText(expected.peRatio)).toBeInTheDocument();
}

export async function thenUserSees52WeekRange(expected: { low: string; high: string; positionPercent: number }): Promise<void> {
  await waitFor(() => {
    expect(screen.getByText('52-Week Range')).toBeInTheDocument();
  });
  expect(screen.getByText(expected.low)).toBeInTheDocument();
  expect(screen.getByText(expected.high)).toBeInTheDocument();
  const indicator = screen.getByRole('meter');
  expect(indicator).toHaveAttribute('aria-valuenow', String(expected.positionPercent));
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
