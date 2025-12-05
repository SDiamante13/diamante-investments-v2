import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import App from '../../App';
import {
  mockAppleSearchResult,
  mockAppleQuote,
  mockAppleProfile2,
  mockAppleMetric,
  mockAppleCandle,
  mockMultipleSearchResults,
} from '../fixtures/mockStockData';
import {
  givenStockDataIsAvailableFor,
  givenSearchReturnsNoMatches,
  givenSearchReturnsMultipleMatches,
  givenStockDataWithMetrics,
  whenUserSearchesFor,
  whenUserTypesInSearch,
  whenUserClicksPreviewItem,
  thenUserSeesStockDetails,
  thenUserSeesMessage,
  thenUserSeesSearchResults,
  thenUserSeesDetailedMetrics,
  thenUserSees52WeekRange,
} from './helpers';

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

  test('user submits unknown stock and sees no results found message', async () => {
    givenSearchReturnsNoMatches();
    render(<App />);

    whenUserSearchesFor('UNKNOWN');

    await thenUserSeesMessage(/no results found/i);
  });

  test('user searches for stock and sees detailed metrics including open, high, low, volume, market cap, PE ratio, and 52-week range with visual indicator', async () => {
    givenStockDataWithMetrics(mockAppleSearchResult, mockAppleQuote, mockAppleProfile2, mockAppleMetric, mockAppleCandle);
    render(<App />);

    whenUserSearchesFor('AAPL');

    await thenUserSeesDetailedMetrics({
      open: '$144.20',
      high: '$146.12',
      low: '$143.89',
      volume: '52.5M',
      marketCap: '$2.75T',
      peRatio: '30.5',
    });

    await thenUserSees52WeekRange({
      high: '$198.23',
      low: '$124.17',
    });
  });
});
