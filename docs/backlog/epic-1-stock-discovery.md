# Epic 1: Stock Discovery

## Story 1.1: User searches for stock by ticker symbol

**Description:** Users can search for stocks using ticker symbols (e.g., "AAPL", "MSFT") to quickly find specific companies. This enables fast discovery of stocks without needing to know full company names.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User searches by valid ticker symbol
  Given user is on the application homepage
  When they type a valid US stock ticker symbol in the search field
  Then search results appear showing the matching stock
  And the stock symbol is displayed in the results
  And the company name is displayed in the results
```

```gherkin
Scenario: Search results appear quickly
  Given user is on the application homepage
  When they type a valid ticker symbol in the search field
  Then search results appear within 500 milliseconds
```

```gherkin
Scenario: User searches for invalid ticker symbol
  Given user is on the application homepage
  When they type an invalid or non-existent ticker symbol
  Then a clear message indicates no results were found
  And the message suggests checking the symbol spelling
```

**Integration:** Accessible from the main application homepage via the search input field at the top of the page.

**Manual Testing:**
1. Open the application in a browser
2. Locate the search input field at the top of the page
3. Type "AAPL" in the search field
4. Verify search results appear showing Apple Inc. stock information
5. Verify results appear quickly (within 500ms)
6. Type "INVALID123" in the search field
7. Verify an appropriate "no results found" message appears

---

## Story 1.2: User searches for stock by company name

**Description:** Users can search for stocks using company names (e.g., "Apple", "Microsoft") to find stocks when they don't know the exact ticker symbol. This makes the platform more accessible to users who think in terms of company names rather than symbols.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User searches by company name
  Given user is on the application homepage
  When they type a company name in the search field
  Then search results appear showing matching stocks
  And results include both the ticker symbol and company name
  And results are ordered by relevance
```

```gherkin
Scenario: Multiple matching stocks appear
  Given user is on the application homepage
  When they type a partial company name that matches multiple stocks
  Then multiple matching stock results are displayed
  And each result shows ticker symbol and full company name
```

```gherkin
Scenario: Autocomplete suggests matches as user types
  Given user is on the application homepage
  When they start typing a company name
  Then suggested stock matches appear below the search field
  And suggestions update as they continue typing
```

**Integration:** Accessible from the same search input field used for ticker symbol search on the main application homepage.

**Manual Testing:**
1. Open the application in a browser
2. Locate the search input field at the top of the page
3. Type "Apple" in the search field
4. Verify search results appear showing Apple Inc. (AAPL)
5. Type "Micro" in the search field
6. Verify autocomplete suggestions appear showing Microsoft and other matches
7. Verify suggestions update as you continue typing

---

## Story 1.3: User views comprehensive stock data after search

**Description:** When a user searches for a stock, they immediately see comprehensive stock data including current price, change indicators, and essential metrics. This enables users to make quick decisions without additional navigation.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: Comprehensive stock data displays after search
  Given user has searched for a valid stock
  When the search results appear
  Then the current stock price is displayed
  And the daily price change (dollar amount) is displayed
  And the daily price change percentage is displayed
  And the change is visually indicated (green for gains, red for losses)
```

```gherkin
Scenario: Essential metrics are visible
  Given user has searched for a valid stock
  When the search results appear
  Then the following metrics are displayed:
    | Metric          |
    | Open price      |
    | High price      |
    | Low price       |
    | Volume          |
    | Market cap      |
    | PE ratio        |
```

```gherkin
Scenario: User sees 52-week range information
  Given user has searched for a valid stock
  When the search results appear
  Then the 52-week high is displayed
  And the 52-week low is displayed
  And the current position within the range is visually indicated
```

**Integration:** Data appears automatically in the search results view after a successful stock search on the main application homepage.

**Manual Testing:**
1. Open the application in a browser
2. Search for "AAPL" using the search field
3. Verify the search results show Apple Inc. stock data
4. Verify current price, change amount, and change percentage are displayed
5. Verify price change is color-coded (green for positive, red for negative)
6. Verify essential metrics (open, high, low, volume, market cap, PE ratio) are visible
7. Verify 52-week high and low are displayed
8. Verify a visual indicator shows current position within the 52-week range

---

## Story 1.4: User adds stock to watchlist from search results

**Description:** Users can add a stock to their watchlist directly from search results with a single click. This enables quick tracking of stocks discovered through search without additional navigation.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User adds stock to watchlist from search
  Given user has searched for a stock and results are displayed
  When they click the star icon (or add to watchlist button) on the stock result
  Then the stock is added to their watchlist
  And the star icon changes to indicate the stock is now in the watchlist
  And a confirmation message appears indicating the stock was added
```

```gherkin
Scenario: User cannot add duplicate stock to watchlist
  Given user has already added a stock to their watchlist
  When they search for the same stock again
  Then the star icon indicates the stock is already in the watchlist
  And clicking the star icon removes it from the watchlist instead of adding it again
```

```gherkin
Scenario: Watchlist persists after adding stock
  Given user has added a stock to their watchlist from search results
  When they navigate to the watchlist view
  Then the added stock appears in their watchlist
```

**Integration:** Accessible via star icon or "Add to Watchlist" button on each stock result card in the search results view.

**Manual Testing:**
1. Open the application in a browser
2. Search for "AAPL" using the search field
3. Verify search results show Apple Inc. stock
4. Click the star icon on the stock result card
5. Verify the star icon changes to filled/active state
6. Verify a confirmation message appears (e.g., "Added to watchlist")
7. Navigate to the watchlist view
8. Verify AAPL appears in the watchlist
9. Search for "AAPL" again
10. Verify the star icon is already filled/active
11. Click the star icon again
12. Verify the stock is removed from the watchlist

---

## Story 1.5: User views search history for quick access

**Description:** Users can see their recently searched stocks for quick access to stocks they've looked up before. This reduces the need to re-type searches and improves efficiency.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: Recently searched stocks appear in history
  Given user has searched for multiple stocks
  When they click on or focus the search field
  Then a list of recently searched stocks appears below the search field
  And the most recent searches appear at the top of the list
```

```gherkin
Scenario: User selects stock from search history
  Given user has previously searched for a stock
  When they click on that stock in the search history
  Then the stock data is displayed immediately
  And they do not need to type the search again
```

```gherkin
Scenario: Search history is limited to recent searches
  Given user has searched for many stocks
  When they view their search history
  Then only the most recent 5-10 searches are displayed
  And older searches are not shown
```

**Integration:** Accessible when clicking on or focusing the search input field on the main application homepage. History appears as a dropdown below the search field.

**Manual Testing:**
1. Open the application in a browser
2. Search for "AAPL"
3. Search for "MSFT"
4. Search for "GOOGL"
5. Click on the search field again
6. Verify a list of recently searched stocks appears below the search field
7. Verify the most recent search (GOOGL) appears at the top
8. Click on "AAPL" in the search history
9. Verify Apple Inc. stock data is displayed immediately
10. Verify you did not need to type "AAPL" again

