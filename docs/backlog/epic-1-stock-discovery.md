# Epic 1: Stock Discovery

## Story 1.1: User searches for stock by ticker symbol

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

## Story 1.1b: User sees stock preview suggestions while typing

**Description:** As users type partial ticker symbols, a preview list appears showing matching stocks. This enables quick discovery of stocks without needing to know the exact ticker symbol, and reduces typos by allowing users to select from suggestions.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User types partial ticker and sees preview list with multiple matches
  Given user is on the application homepage
  When they type a partial ticker symbol (e.g., "AAP") in the search field
  Then a preview list appears below the search field
  And the preview list shows all matching stocks
  And each preview item displays the stock symbol
  And each preview item displays the company name
```

```gherkin
Scenario: User clicks preview item to view full stock details
  Given user has typed a partial ticker and preview list is visible
  When they click on a preview item
  Then the preview list closes
  And the full stock result is displayed with current price
  And the dollar amount change is displayed
  And the percentage change is displayed
```

```gherkin
Scenario: User types invalid partial ticker and sees no matches message
  Given user is on the application homepage
  When they type a partial ticker that has no matches (e.g., "ZZZZ")
  Then a "No matches found" message appears in the preview dropdown
  And no preview items are displayed
```

```gherkin
Scenario: Preview list appears after user stops typing
  Given user is on the application homepage
  When they type characters in the search field
  And they pause typing for a brief moment
  Then the preview list appears with matching results
```

```gherkin
Scenario: Preview list updates as user continues typing
  Given user has typed "AA" and preview list is visible
  When they type additional characters to make "AAP"
  Then the preview list updates to show only stocks matching "AAP"
  And previously visible non-matching stocks are removed from the list
```

**Integration:** Accessible from the search input field on the main application homepage. Preview appears automatically as user types, positioned directly below the search field.

**Manual Testing:**
1. Open the application in a browser
2. Locate the search input field at the top of the page
3. Type "AA" in the search field
4. Wait briefly (less than 1 second)
5. Verify a preview list appears below the search field
6. Verify multiple matching stocks are shown (e.g., AAPL, AAL, etc.)
7. Verify each preview item shows both symbol and company name
8. Continue typing "P" to make "AAP"
9. Verify the preview list updates to show only "AAP" matches
10. Click on "AAPL" in the preview list
11. Verify the preview list closes
12. Verify full stock details appear with current price, dollar change, and percentage change
13. Clear the search field
14. Type "ZZZZ" in the search field
15. Verify "No matches found" message appears in the preview dropdown
16. Verify no preview items are shown

---

## Story 1.1c: Search returns US-exchange stocks only

**Description:** Search results only include stocks from US exchanges that are accessible with the current API tier. This prevents users from seeing or selecting international exchange tickers that would fail when loading stock data.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User searches and sees only US-exchange stocks
  Given user is on the application homepage
  When they type a ticker symbol in the search field
  Then only stocks from US exchanges appear in results
  And no stocks with exchange suffixes (e.g., .TO, .NE, .BC) are shown
```

```gherkin
Scenario: User selects US stock and views data without errors
  Given user has searched for a stock
  And the preview list shows matching US stocks
  When they click on any stock in the preview list
  Then the stock data loads successfully
  And no 403 authorization errors occur
```

**Integration:** Applied automatically to all search queries via FinnHub API `exchange=US` parameter.

**Manual Testing:**
1. Open the application in a browser
2. Type "AAPL" in the search field
3. Verify preview list shows "AAPL" (US stock)
4. Verify no "AAPL.TO" (Toronto), "AAPL.NE" (NEO), or similar exchange suffixes appear
5. Click on "AAPL" in the preview list
6. Verify stock data loads without 403 errors
7. Search for "SHOP" (company traded on both US and Canadian exchanges)
8. Verify only US-exchange results appear
9. Verify no stocks with exchange suffix dots are shown

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

## Story 1.3: User adds stock to watchlist from search results

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

## Story 1.4: User views search history for quick access

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

