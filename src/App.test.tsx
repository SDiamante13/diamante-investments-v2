import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('user sees search results with stock symbol and company name after typing valid ticker', async () => {
  render(<App />);

  const searchInput = screen.getByRole('textbox', { name: /search/i });
  await userEvent.type(searchInput, 'AAPL');

  expect(await screen.findByText('AAPL')).toBeInTheDocument();
  expect(screen.getByText(/apple inc/i)).toBeInTheDocument();
});

test('user sees stock not found message when typing invalid ticker', async () => {
  render(<App />);

  const searchInput = screen.getByRole('textbox', { name: /search/i });
  await userEvent.type(searchInput, 'INVALID');

  expect(await screen.findByText(/not found/i)).toBeInTheDocument();
});

test('user sees error message when API request fails', async () => {
  render(<App />);

  const searchInput = screen.getByRole('textbox', { name: /search/i });
  await userEvent.type(searchInput, 'ERROR');

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});

test('user sees updated results when changing search query', async () => {
  render(<App />);

  const searchInput = screen.getByRole('textbox', { name: /search/i });
  await userEvent.type(searchInput, 'AAPL');

  expect(await screen.findByText('AAPL')).toBeInTheDocument();
  expect(screen.getByText(/apple inc/i)).toBeInTheDocument();

  await userEvent.clear(searchInput);
  await userEvent.type(searchInput, 'MSFT');

  expect(await screen.findByText('MSFT')).toBeInTheDocument();
  expect(screen.getByText(/microsoft/i)).toBeInTheDocument();
  expect(screen.queryByText('AAPL')).not.toBeInTheDocument();
});

test('user sees clean state when clearing search input', async () => {
  render(<App />);

  const searchInput = screen.getByRole('textbox', { name: /search/i });
  await userEvent.type(searchInput, 'INVALID');

  expect(await screen.findByText(/not found/i)).toBeInTheDocument();

  await userEvent.clear(searchInput);

  expect(screen.queryByText(/not found/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
