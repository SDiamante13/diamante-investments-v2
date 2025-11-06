# Epic 2: Watchlist Management

## Story 2.1: User views watchlist with basic stock information

**Description:** Users can view all their tracked stocks in a single watchlist view. Each stock displays essential information (price, change, percentage) in a compact card format, enabling users to quickly assess performance across all tracked stocks.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: Watchlist displays all tracked stocks
  Given user has added multiple stocks to their watchlist
  When they navigate to the watchlist view
  Then all stocks in their watchlist are displayed
  And each stock appears in its own card
  And stocks are displayed in a scrollable list or grid
```

```gherkin
Scenario: Basic stock information is visible in watchlist cards
  Given user is viewing their watchlist
  When they look at each stock card
  Then the following information is displayed:
    | Information           |
    | Stock symbol          |
    | Company name          |
    | Current price         |
    | Daily change amount   |
    | Daily change percentage |
```

```gherkin
Scenario: Visual indicators show performance
  Given user is viewing their watchlist
  When they look at stock cards
  Then stocks with gains display in green color scheme
  And stocks with losses display in red color scheme
  And the color coding makes it easy to quickly assess performance
```

```gherkin
Scenario: Empty watchlist shows helpful message
  Given user has not added any stocks to their watchlist
  When they navigate to the watchlist view
  Then a message indicates their watchlist is empty
  And the message suggests adding stocks from search
```

**Integration:** Accessible via a "Watchlist" navigation link or tab in the main application navigation, or from the homepage after adding stocks.

**Manual Testing:**
1. Open the application in a browser
2. Add 3-5 stocks to the watchlist (e.g., AAPL, MSFT, GOOGL)
3. Navigate to the watchlist view
4. Verify all added stocks are displayed
5. Verify each stock appears in its own card
6. Verify each card shows symbol, company name, current price, change amount, and change percentage
7. Verify stocks with gains are displayed in green
8. Verify stocks with losses are displayed in red
9. Clear the watchlist (remove all stocks)
10. Navigate to the watchlist view
11. Verify a helpful message appears indicating the watchlist is empty

---

## Story 2.2: User expands stock card to view detailed metrics

**Description:** Users can click on a stock card in the watchlist to expand it and view comprehensive financial metrics. This enables users to see basic information at a glance but drill down into details when needed.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User expands stock card to see details
  Given user is viewing their watchlist
  When they click on a stock card
  Then the card expands to reveal additional detailed metrics
  And the card shows a smooth animation during expansion
```

```gherkin
Scenario: Detailed metrics are displayed when expanded
  Given user has expanded a stock card in the watchlist
  When they view the expanded card
  Then the following detailed metrics are displayed:
    | Metric              |
    | Open price          |
    | High price          |
    | Low price           |
    | Volume              |
    | Market cap          |
    | PE ratio            |
    | 52-week high        |
    | 52-week low         |
    | 50-day moving average |
    | 100-day moving average |
    | Dividend yield      |
```

```gherkin
Scenario: User can collapse expanded card
  Given user has expanded a stock card in the watchlist
  When they click on the card again or click a collapse button
  Then the card collapses back to its compact view
  And only the basic information is visible again
```

```gherkin
Scenario: Only one card expanded at a time
  Given user has multiple stocks in their watchlist
  When they expand one stock card
  And then click to expand a different stock card
  Then the previously expanded card collapses
  And only the newly clicked card is expanded
```

**Integration:** Accessible by clicking on any stock card in the watchlist view. The expansion happens inline within the watchlist.

**Manual Testing:**
1. Open the application in a browser
2. Navigate to the watchlist view with multiple stocks
3. Click on a stock card (e.g., AAPL)
4. Verify the card expands smoothly
5. Verify detailed metrics are now visible (open, high, low, volume, market cap, PE ratio, 52-week range, moving averages, dividend yield)
6. Click on the same card again
7. Verify the card collapses back to compact view
8. Expand a stock card
9. Click on a different stock card
10. Verify the first card collapses and the second card expands
11. Verify only one card is expanded at a time

---

## Story 2.3: User removes stock from watchlist

**Description:** Users can remove stocks from their watchlist to keep it relevant and organized. This enables users to maintain a curated list of stocks they actively want to track.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User removes stock from watchlist
  Given user has stocks in their watchlist
  When they click the remove button (or star icon) on a stock card
  Then the stock is removed from the watchlist
  And the stock card disappears from the view
  And a confirmation message appears indicating the stock was removed
```

```gherkin
Scenario: Removed stock is no longer in watchlist
  Given user has removed a stock from their watchlist
  When they navigate away and return to the watchlist
  Then the removed stock does not appear in the watchlist
  And the watchlist only shows stocks that have not been removed
```

```gherkin
Scenario: User can remove multiple stocks
  Given user has multiple stocks in their watchlist
  When they remove multiple stocks
  Then each removed stock disappears from the watchlist
  And the remaining stocks continue to be displayed
```

**Integration:** Accessible via a remove button (X icon) or by clicking the star icon on stock cards in the watchlist view. The star icon toggles the watchlist status.

**Manual Testing:**
1. Open the application in a browser
2. Navigate to the watchlist view with multiple stocks
3. Click the remove button (X icon) or star icon on a stock card
4. Verify the stock card disappears from the watchlist
5. Verify a confirmation message appears (e.g., "Removed from watchlist")
6. Verify the watchlist now shows only the remaining stocks
7. Remove another stock
8. Verify it is also removed
9. Refresh the browser page
10. Navigate to the watchlist view
11. Verify the removed stocks do not reappear
12. Verify only stocks that were not removed are displayed

---

## Story 2.4: Watchlist persists across browser sessions

**Description:** User watchlists are saved and restored when they return to the application, even after closing the browser. This ensures users don't lose their curated stock lists and provides a seamless experience.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: Watchlist persists after browser refresh
  Given user has added stocks to their watchlist
  When they refresh the browser page
  Then all stocks in their watchlist are still present
  And the watchlist displays exactly as it did before refresh
```

```gherkin
Scenario: Watchlist persists after closing browser
  Given user has added stocks to their watchlist
  When they close the browser completely
  And then reopen the browser and navigate to the application
  Then all stocks in their watchlist are still present
  And the watchlist is restored exactly as it was
```

```gherkin
Scenario: Watchlist changes persist immediately
  Given user is viewing their watchlist
  When they add or remove a stock
  Then the change is saved immediately
  And the change persists even if they navigate away immediately
```

```gherkin
Scenario: Watchlist persists across different browser tabs
  Given user has stocks in their watchlist
  When they open the application in a new browser tab
  Then the watchlist in the new tab shows the same stocks
  And changes made in one tab are reflected in other tabs
```

**Integration:** Works automatically for all watchlist operations. No separate user action is required - persistence happens in the background.

**Manual Testing:**
1. Open the application in a browser
2. Add 3-5 stocks to the watchlist
3. Refresh the browser page (F5 or Cmd+R)
4. Navigate to the watchlist view
5. Verify all stocks are still present
6. Close the browser completely
7. Reopen the browser and navigate to the application
8. Navigate to the watchlist view
9. Verify all stocks are still present
10. Add a new stock to the watchlist
11. Immediately close the browser
12. Reopen the browser and navigate to the application
13. Verify the newly added stock is present
14. Open the application in a second browser tab
15. Navigate to the watchlist view in the second tab
16. Verify the watchlist shows the same stocks
17. Remove a stock from the watchlist in one tab
18. Refresh the other tab
19. Verify the removed stock is also gone from the second tab

