# Bug Backlog

## Critical Bugs

### BUG-1: Valid Stock Searches Crash with API 403 Errors
**Status:** Open
**Priority:** Critical
**Discovered:** 2025-11-12

**Description:**
Searching for valid stock tickers (AAPL, TSLA) results in complete application crash due to unhandled 403 Forbidden responses from Finnhub API.

**Current Behavior:**
- User searches for valid ticker (e.g., AAPL)
- Multiple API requests sent to different exchanges (.SN, .BC, .TO, .NE, .MX, .WA, .VI)
- All requests return 403 Forbidden
- Application crashes with TypeError: Cannot read property 'toFixed' of undefined
- User sees blank screen

**Expected Behavior:**
- Filter out 403 responses and show accessible stocks
- Display error message if no accessible results found
- Graceful degradation without crash

**Root Cause:**
1. API key may be invalid/expired/lacking permissions
2. 403 filtering not implemented per Epic 1.2 AC
3. `formatPrice` function lacks null checks

**User Stories to Fix:**

#### US-BUG-1.1: Implement 403 Response Filtering
**AC:**
- When API returns 403 for a stock, filter it from results
- Continue showing other accessible stocks
- No crash if some exchanges return 403

#### US-BUG-1.2: Add Null Safety to formatPrice
**AC:**
- `formatPrice` handles undefined/null price values
- Returns fallback text (e.g., "N/A") when price unavailable
- No TypeError crashes

#### US-BUG-1.3: Display Error When No Accessible Stocks
**AC:**
- If all API requests return 403, show user-friendly error
- Error message: "Stock data unavailable. Please check your API access."
- User can try different ticker

---

## High Priority Bugs

### BUG-2: Loading State Not Displayed
**Status:** Open
**Priority:** High
**Discovered:** 2025-11-12

**Description:**
`isLoading` state exists in code but is not displayed to user, causing confusion during API calls.

**Current Behavior:**
- User searches for ticker
- No visual feedback during API request
- User unsure if search is processing

**Expected Behavior:**
- Loading spinner/skeleton shown during API fetch
- Clear indication request is in progress
- Loading state clears when results arrive or error occurs

**User Story:**

#### US-BUG-2.1: Display Loading State
**AC:**
- Show loading indicator when `isLoading === true`
- Loading indicator visible during all API requests
- Loading state clears on success or error

---

### BUG-3: No Error Boundary for Runtime Errors
**Status:** Open
**Priority:** High
**Discovered:** 2025-11-12

**Description:**
Application has no React error boundary, causing complete white screen crashes on unhandled errors.

**Current Behavior:**
- Runtime errors crash entire app
- User sees blank white screen
- No recovery option

**Expected Behavior:**
- Error boundary catches React errors
- Fallback UI displayed with error message
- Option to reload or return to initial state

**User Story:**

#### US-BUG-3.1: Add React Error Boundary
**AC:**
- Error boundary wraps main app component
- Fallback UI shows friendly error message
- "Try Again" button resets error boundary
- Error logged to console for debugging

---

## Related Test Report
See: `test-report-stock-features-2025-11-12-14-53-11.md`

**Screenshots:**
- `aapl-search-error.png` - Demonstrates BUG-1 crash
- `tsla-search-error.png` - Demonstrates BUG-1 crash
