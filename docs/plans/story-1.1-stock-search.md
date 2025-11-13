# Story 1.1: Stock Search by Ticker Symbol

**Epic:** Stock Discovery
**Status:** In Progress
**Date:** November 12, 2025

## Overview

Users can search for stocks using ticker symbols (e.g., 'AAPL', 'MSFT') to quickly find specific companies. This enables fast discovery of stocks without needing to know full company names.

## Acceptance Criteria

### Scenario 1: User searches by valid ticker symbol
- Given user is on the application homepage
- When they type a valid US stock ticker symbol in the search field
- Then search results appear showing the matching stock
- And the stock symbol & company name is displayed in the results

### Scenario 2: User searches for invalid ticker symbol
- Given user is on the application homepage
- When they type an invalid or non-existent ticker symbol
- Then a clear message indicates no results were found

### Scenario 3: Search results display current price with dollar and percentage change
- Given user is on the application homepage
- When they search for a valid ticker symbol
- Then the search results display the stock's current price
- And the dollar amount change is displayed (e.g., '+$2.35')
- And the percentage change is displayed (e.g., '+1.64%')
- And positive changes are shown in green
- And negative changes are shown in red

## Technical Implementation Plan

### 1. Setup
- Create folder structure: `src/components/`, `src/services/`, `src/types/`

### 2. Type Definitions (`src/types/finnhub.ts`)
Define interfaces for:
- `SearchResult` - Finnhub search API response
- `Quote` - Finnhub quote API response
- `StockData` - Combined data for display

### 3. Finnhub Service (`src/services/finnhub.ts`)
Create functions:
- `searchStock(symbol: string)` - calls `/api/v1/search`
- `getQuote(symbol: string)` - calls `/api/v1/quote`
- `getStockData(symbol: string)` - combines both API calls
- Error handling for invalid symbols and API failures

### 4. Components

#### `StockSearch.tsx`
- Search input field
- Submit button
- Search on submit (not live search)

#### `StockCard.tsx`
- Display company name and ticker
- Display current price
- Display dollar change with color coding (green/red)
- Display percentage change with color coding (green/red)

#### `ErrorMessage.tsx`
- Display 'no results found' for invalid tickers
- Clear, user-friendly error messaging

### 5. App Integration (`App.tsx`)
- State management for search results
- Loading state during API calls
- Error state for failed searches
- Success state with results display

### 6. Styling (Plain CSS)
- `StockSearch.css` - centered search bar layout
- `StockCard.css` - card design with color-coded changes
- Green for positive changes (#00C853 or similar)
- Red for negative changes (#D50000 or similar)

### 7. Testing (MSW + Acceptance Tests)

#### Setup
- Install `msw` dev dependency
- Create `src/mocks/handlers.ts` with mock responses for:
  - `/api/v1/search` endpoint
  - `/api/v1/quote` endpoint
- Configure `src/mocks/server.ts` for test environment
- Update `setupTests.ts` to start/stop MSW server

#### Test Cases (`StockSearch.test.tsx`)
- Valid ticker returns stock data with price and changes
- Invalid ticker shows error message
- Positive changes display in green
- Negative changes display in red

### 8. Verification
- Run test suite: `npm test`
- Verify all acceptance criteria pass
- Manual smoke testing with real Finnhub API

## API Endpoints Used

### Search Endpoint
```
GET https://finnhub.io/api/v1/search?q=AAPL&token=API_KEY
```

Returns:
- `description` (company name)
- `symbol` (ticker)
- `displaySymbol` (ticker)
- `type` (Common Stock, etc.)

### Quote Endpoint
```
GET https://finnhub.io/api/v1/quote?symbol=AAPL&token=API_KEY
```

Returns:
- `c` (current price)
- `d` (change)
- `dp` (percent change)
- `h` (high price of the day)
- `l` (low price of the day)
- `o` (open price of the day)
- `pc` (previous close)
- `t` (timestamp)

## UI Design (Option 1: Centered Card Layout)

```
┌────────────────────────────────────────────────┐
│                                                │
│          DIAMANTE INVESTMENTS                  │
│                                                │
│    ┌──────────────────────────────┐           │
│    │ Search ticker (e.g., AAPL)   │  [Search] │
│    └──────────────────────────────┘           │
│                                                │
│    ┌────────────────────────────────────────┐ │
│    │  AAPL - Apple Inc                      │ │
│    │                                        │ │
│    │  $145.52                               │ │
│    │  +$2.35 (+1.64%)                       │ │
│    └────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘
```

## Notes

- Using only 2 Finnhub endpoints (search + quote), not profile2
- Search on submit (button click/enter), not live search-as-you-type
- Direct browser calls to Finnhub API (simpler for MVP)
- Plain CSS styling (no external libraries)
- MSW for mocking API responses in tests
