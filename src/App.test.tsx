import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('AC1: Valid ticker symbol shows matching stock with symbol and company name', async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await user.type(input, 'AAPL');
  await user.click(button);

  expect(await screen.findByText(/AAPL/)).toBeInTheDocument();
  expect(await screen.findByText(/Apple Inc/)).toBeInTheDocument();
});

test('AC2: Invalid ticker symbol shows no results found message', async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await user.type(input, 'INVALID');
  await user.click(button);

  expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
});
