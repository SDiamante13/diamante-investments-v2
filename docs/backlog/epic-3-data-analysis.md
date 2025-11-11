# Epic 3: Data Analysis

## Story 3.1: User views candlestick chart for stock price movements

**Description:** Users can view candlestick charts that visualize stock price movements over time. This enables users to analyze price trends, patterns, and trading activity through visual representation of open, high, low, and close (OHLC) data.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User views candlestick chart for a stock
  Given user has searched for a stock or is viewing a stock in their watchlist
  When they navigate to the chart view for that stock
  Then a candlestick chart is displayed showing price movements
  And each candlestick represents OHLC data for a time period
  And green candlesticks indicate price increases
  And red candlesticks indicate price decreases
```

```gherkin
Scenario: Chart displays relevant price information
  Given user is viewing a candlestick chart
  When they look at the chart
  Then the chart shows price on the vertical axis
  And the chart shows time on the horizontal axis
  And a legend or tooltip explains the candlestick colors
```

```gherkin
Scenario: Chart is interactive with hover information
  Given user is viewing a candlestick chart
  When they hover over a candlestick
  Then detailed price information appears (open, high, low, close)
  And the information is displayed in a tooltip or popup
```

**Integration:** Accessible from the stock detail view (either from search results or expanded watchlist cards) via a "View Chart" button or tab, or directly integrated into the stock detail view.

**Manual Testing:**
1. Open the application in a browser
2. Search for "AAPL" or navigate to a stock in the watchlist
3. Click to view the chart or navigate to the chart section
4. Verify a candlestick chart is displayed
5. Verify green candlesticks represent price increases
6. Verify red candlesticks represent price decreases
7. Verify the chart shows price on the Y-axis and time on the X-axis
8. Hover over a candlestick
9. Verify a tooltip appears showing OHLC data for that time period

---

## Story 3.2: User switches chart timeframes

**Description:** Users can switch between different chart timeframes (hourly, daily, weekly, monthly) to analyze both short-term and long-term price trends. This enables users to view stock performance across different time horizons.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User switches to hourly timeframe
  Given user is viewing a candlestick chart
  When they select the "Hourly" timeframe option
  Then the chart updates to show hourly candlesticks
  And each candlestick represents one hour of trading data
  And the chart displays recent hourly data
```

```gherkin
Scenario: User switches to daily timeframe
  Given user is viewing a candlestick chart
  When they select the "Daily" timeframe option
  Then the chart updates to show daily candlesticks
  And each candlestick represents one day of trading data
  And the chart displays daily data over a longer time period
```

```gherkin
Scenario: User switches to weekly timeframe
  Given user is viewing a candlestick chart
  When they select the "Weekly" timeframe option
  Then the chart updates to show weekly candlesticks
  And each candlestick represents one week of trading data
  And the chart displays weekly data over an extended period
```

```gherkin
Scenario: User switches to monthly timeframe
  Given user is viewing a candlestick chart
  When they select the "Monthly" timeframe option
  Then the chart updates to show monthly candlesticks
  And each candlestick represents one month of trading data
  And the chart displays monthly data over a long-term period
```

**Integration:** Accessible via timeframe selector buttons (Hourly, Daily, Weekly, Monthly) near the chart view, typically above or below the chart display.

**Manual Testing:**
1. Open the application in a browser
2. Navigate to a stock chart view
3. Verify timeframe selector is visible
4. Select "Daily" timeframe
5. Verify the chart updates to show daily candlesticks
6. Select "Hourly" timeframe
7. Verify the chart updates to show hourly candlesticks
8. Select "Weekly" timeframe
9. Verify the chart updates to show weekly candlesticks
10. Select "Monthly" timeframe
11. Verify the chart updates to show monthly candlesticks

---

## Story 3.3: User views moving averages and performance indicators

**Description:** Users can view moving averages (50-day and 100-day) and performance indicators to identify trends and potential entry/exit points. This provides technical analysis information to help users make trading decisions.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User views 50-day moving average
  Given user is viewing a stock with available moving average data
  When they view the stock details or chart
  Then the 50-day moving average is displayed
  And the value is clearly labeled as "50-day MA"
  And the current price position relative to the moving average is indicated
```

```gherkin
Scenario: User views 100-day moving average
  Given user is viewing a stock with available moving average data
  When they view the stock details or chart
  Then the 100-day moving average is displayed
  And the value is clearly labeled as "100-day MA"
  And the current price position relative to the moving average is indicated
```

```gherkin
Scenario: Moving averages are displayed on chart
  Given user is viewing a candlestick chart
  When they view the chart
  Then the 50-day moving average line is overlaid on the chart
  And the 100-day moving average line is overlaid on the chart
  And each line is visually distinct and labeled
```

**Integration:** Accessible from the stock detail view and chart view. Moving averages may be displayed as numeric values in the metrics section and as lines on the chart.

**Manual Testing:**
1. Open the application in a browser
2. Search for "AAPL" or navigate to a stock in the watchlist
3. Navigate to view stock details or chart
4. Verify 50-day moving average is displayed with clear label
5. Verify 100-day moving average is displayed with clear label
6. Verify both moving average values are shown as numbers
7. Navigate to the chart view
8. Verify 50-day moving average line is overlaid on the candlestick chart
9. Verify 100-day moving average line is overlaid on the candlestick chart
10. Verify the lines are visually distinct (different colors or styles)
11. Verify each line is labeled in a legend

---

## Story 3.4: User views 52-week range with position indicator

**Description:** Users can view the 52-week high and low prices with a visual indicator showing where the current price falls within that range. This helps users understand the stock's recent performance context.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: User views 52-week range information
  Given user is viewing a stock
  When they view the stock details
  Then the 52-week high price is displayed
  And the 52-week low price is displayed
  And both values are clearly labeled
```

```gherkin
Scenario: Visual indicator shows current position in range
  Given user is viewing 52-week range information
  When they look at the range display
  Then a visual bar or indicator shows the 52-week range
  And the current price position is marked on the range
  And it's easy to see if the price is near the high, low, or middle of the range
```

```gherkin
Scenario: Range percentage is calculated and displayed
  Given user is viewing 52-week range information
  When they look at the range display
  Then the percentage position within the range is displayed
  And the percentage indicates how close the current price is to the 52-week high or low
```

**Integration:** Accessible from the stock detail view, typically displayed alongside other key metrics in the expanded stock card or search results detail view.

**Manual Testing:**
1. Open the application in a browser
2. Search for "AAPL" or navigate to a stock in the watchlist
3. Navigate to view stock details
4. Verify 52-week high is displayed with clear label
5. Verify 52-week low is displayed with clear label
6. Verify a visual bar or indicator shows the range from low to high
7. Verify the current price position is marked on the range indicator
8. Verify it's visually clear where the current price falls (near high, low, or middle)
9. Verify the percentage position within the range is displayed (e.g., "Current price is at 75% of 52-week range")
10. Test with a stock near its 52-week high
11. Verify the indicator shows the price near the top of the range
12. Test with a stock near its 52-week low
13. Verify the indicator shows the price near the bottom of the range

