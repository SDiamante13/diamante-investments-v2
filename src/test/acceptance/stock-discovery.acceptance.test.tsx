import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import App from '../../App';
import { mockAppleSearchResult, mockAppleQuote, mockMultipleSearchResults, mockEmptySearchResult } from '../fixtures/mockStockData';
import {
  givenStockDataIsAvailableFor,
  givenSearchReturnsNoMatches,
  givenSearchReturnsMultipleMatches,
  whenUserSearchesFor,
  whenUserTypesInSearch,
  whenUserClicksPreviewItem,
  thenUserSeesStockDetails,
  thenUserSeesMessage,
  thenUserSeesSearchResults,
  thenUserSeesMetrics,
  thenUserSees52WeekRange,
} from '../helpers/acceptanceHelpers';

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
    givenSearchReturnsNoMatches(mockEmptySearchResult);
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
    givenSearchReturnsNoMatches(mockEmptySearchResult);
    render(<App />);

    whenUserSearchesFor('UNKNOWN');

    await thenUserSeesMessage(/no results found/i);
  });

  test('user clicks preview item and sees detailed metrics including open, high, low, market cap, and P/E ratio on stock card', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserTypesInSearch('AAP');
    await thenUserSeesMessage('APPLE INC');
    whenUserClicksPreviewItem('AAPL');

    await thenUserSeesMetrics({
      open: '$144.20',
      high: '$146.12',
      low: '$143.89',
      marketCap: '2.8T',
      peRatio: '28.5',
    });
  });

  test('user sees 52-week range with high, low, and visual position indicator on stock card', async () => {
    givenStockDataIsAvailableFor(mockAppleSearchResult, mockAppleQuote);
    render(<App />);

    whenUserTypesInSearch('AAP');
    await thenUserSeesMessage('APPLE INC');
    whenUserClicksPreviewItem('AAPL');

    await thenUserSees52WeekRange({
      high: '185.0',
      low: '124.0',
    });
  });
});
