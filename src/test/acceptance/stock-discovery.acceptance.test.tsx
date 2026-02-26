import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import App from '../../App';
import {
  mockAppleSearchResult,
  mockAppleQuote,
  mockMultipleSearchResults,
  mockAppleProfile,
  mockAppleMetric,
} from '../fixtures/mockStockData';
import {
  givenStockDataIsAvailableFor,
  givenSearchReturnsNoMatches,
  givenSearchReturnsMultipleMatches,
  givenFullStockDataIsAvailableFor,
  whenUserSearchesFor,
  whenUserTypesInSearch,
  whenUserClicksPreviewItem,
  thenUserSeesStockDetails,
  thenUserSeesMessage,
  thenUserSeesSearchResults,
  thenUserSeesDetailedMetrics,
  thenUserSees52WeekRange,
} from './acceptance-helpers';

describe('Stock Discovery', () => {
  test('user searches valid ticker and sees stock data with symbol, company name, price, dollar change, and percent change', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserSearchesFor('AAPL');

    await thenUserSeesStockDetails({
      symbol: 'AAPL',
      company: 'APPLE INC',
      price: '$145.52',
      change: '+$2.35',
      percent: '+1.64%',
    });
  });

  test('user searches invalid ticker and sees no matches message preview', async () => {
    givenSearchReturnsNoMatches();
    render(<App />);

    whenUserTypesInSearch('INVALID123');

    await thenUserSeesMessage(/no matches found/i);
  });

  test('user types partial ticker and sees preview list with multiple matches', async () => {
    givenSearchReturnsMultipleMatches(mockMultipleSearchResults);
    render(<App />);

    whenUserTypesInSearch('AAP');

    await thenUserSeesSearchResults([
      { symbol: 'AAPL', description: 'APPLE INC' },
      { symbol: 'AAPD', description: 'DIREXION AAPL BEAR' },
    ]);
  });

  test('user clicks preview item and sees full stock result with price', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserTypesInSearch('AAP');
    await thenUserSeesMessage('APPLE INC');
    whenUserClicksPreviewItem('AAPL');

    await thenUserSeesStockDetails({
      symbol: 'AAPL',
      company: 'APPLE INC',
      price: '$145.52',
      change: '+$2.35',
      percent: '+1.64%',
    });
  });

  test('user clicks preview item and sees detailed metrics on stock card', async () => {
    givenFullStockDataIsAvailableFor({
      search: mockAppleSearchResult,
      quote: mockAppleQuote,
      profile: mockAppleProfile,
      metric: mockAppleMetric,
    });
    render(<App />);

    whenUserTypesInSearch('AAP');
    await thenUserSeesMessage('APPLE INC');
    whenUserClicksPreviewItem('AAPL');

    await thenUserSeesDetailedMetrics({
      open: '$144.20',
      high: '$146.12',
      low: '$143.89',
      marketCap: '2.8T',
      peRatio: '29.54',
    });
  });

  test('user clicks preview item and sees 52-week range with high and low values', async () => {
    givenFullStockDataIsAvailableFor({
      search: mockAppleSearchResult,
      quote: mockAppleQuote,
      profile: mockAppleProfile,
      metric: mockAppleMetric,
    });
    render(<App />);

    whenUserTypesInSearch('AAP');
    await thenUserSeesMessage('APPLE INC');
    whenUserClicksPreviewItem('AAPL');

    await thenUserSees52WeekRange({
      low: '$124.17',
      high: '$198.23',
    });
  });

  test('user submits unknown stock and sees no results found message', async () => {
    givenSearchReturnsNoMatches();
    render(<App />);

    whenUserSearchesFor('UNKNOWN');

    await thenUserSeesMessage(/no results found/i);
  });
});
