# Epic 1: Stock Discovery

## Story 1.1: User searches for stock by ticker symbol ✅

**Description:** Users can search for stocks using ticker symbols (e.g., "AAPL", "MSFT") to quickly find specific companies. This enables fast discovery of stocks without needing to know full company names.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User searches by valid ticker symbol
  Given user is on the application homepage
  When they type a valid US stock ticker symbol in the search field
  Then search results appear showing the matching stock
  And the stock symbol & company name is displayed in the results
```

```gherkin
Scenario: User searches for invalid ticker symbol
  Given user is on the application homepage
  When they type an invalid or non-existent ticker symbol
  Then a clear message indicates no results were found
```

```gherkin
  Scenario: Search results display current price with dollar and
percentage change
Given user is on the application homepage
When they search for a valid ticker symbol
Then the search results display the stock's current price
And the dollar amount change is displayed (e.g., "+$2.35")
And the percentage change is displayed (e.g., "+1.64%")
And positive changes are shown in green
And negative changes are shown in red
```

**Integration:** Accessible from the main application homepage via the search input field at the top of the page.

**Manual Testing:**
1. Open the application in a browser
2. Locate the search input field at the top of the page
3. Type "AAPL" in the search field
4. Verify search results appear showing Apple Inc. stock information
5. Verify current price is displayed in the search results
6. Verify daily dollar amount change is displayed (e.g., "+$2.35")
7. Verify daily percentage change is displayed (e.g., "+1.64%")
8. Verify positive changes are shown in green
9. Verify negative changes are shown in red (search for a stock with negative change)
10. Type "INVALID123" in the search field
11. Verify an appropriate "no results found" message appears
---

## Story 1.2: User clicks stock card to view detailed metrics

**Description:** When a user clicks on a stock card from search results, detailed metrics are displayed including essential trading data and 52-week range information. This allows users to see comprehensive data on demand without cluttering the initial search results.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User clicks stock card to view detailed metrics
  Given user has searched for a valid stock
  And the search results are displayed
  When they click on the stock card
  Then the following detailed metrics are displayed:
    | Metric          |
    | Open price      |
    | High price      |
    | Low price       |
    | Volume          |
    | Market cap      |
    | PE ratio        |
```

```gherkin
Scenario: User sees 52-week range information on expanded card
  Given user has searched for a valid stock
  When they click on the stock card
  Then the 52-week high is displayed
  And the 52-week low is displayed
  And the current position within the range is visually indicated
```

**Integration:** User clicks on a stock card in the search results to expand or navigate to detailed view.

**Manual Testing:**
1. Open the application in a browser
2. Search for "AAPL" using the search field
3. Verify the search results show Apple Inc. stock card
4. Click on the stock card
5. Verify essential metrics (open, high, low, volume, market cap, PE ratio) are now visible
6. Verify 52-week high and low are displayed
7. Verify a visual indicator shows current position within the 52-week range

---

## Story 1.4: User adds stock to watchlist from search results

**Description:** Users can add a stock to their watchlist directly from search results with a single click. This enables quick tracking of stocks discovered through search without additional navigation.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User adds stock to watchlist from search
  Given user has searched for a stock and results are displayed
  When they click the add to watchlist control on the stock result
  Then the stock is added to their watchlist
  And the control changes visual state to indicate the stock is now in the watchlist
  And a confirmation message appears indicating the stock was added
```

```gherkin
Scenario: Watchlist control shows current state and toggles
  Given user has added a stock to their watchlist
  When they search for the same stock again
  Then the watchlist control shows it is already on the watchlist
  And clicking the control removes the stock from the watchlist
```

```gherkin
Scenario: Watchlist persists after adding stock
  Given user has added a stock to their watchlist from search results
  When they navigate to the watchlist view
  Then the added stock appears in their watchlist
```

**Integration:** Accessible via an add to watchlist control on each stock result card in the search results view.

**Manual Testing:**
1. Open the application in a browser
2. Search for "AAPL" using the search field
3. Verify search results show Apple Inc. stock
4. Click the add to watchlist control on the stock result card
5. Verify the control changes to an active/selected state
6. Verify a confirmation message appears (e.g., "Added to watchlist")
7. Navigate to the watchlist view
8. Verify AAPL appears in the watchlist
9. Search for "AAPL" again
10. Verify the watchlist control shows active/selected state
11. Click the watchlist control again
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
  Then a new search is performed for that stock
  And the stock data is displayed
```

```gherkin
Scenario: Search history is limited to recent searches
  Given user has searched for many stocks
  When they view their search history
  Then only the most recent 5 searches are displayed
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

