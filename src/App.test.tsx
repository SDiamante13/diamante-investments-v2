import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello world', () => {
  render(<App />);
  const heading = screen.getByText(/hello world/i);
  expect(heading).toBeInTheDocument();
});
