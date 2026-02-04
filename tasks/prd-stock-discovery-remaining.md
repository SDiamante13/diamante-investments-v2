# PRD: Stock Discovery (Stories 1.2-1.4)

## Introduction

Complete the Stock Discovery epic by adding detailed stock metrics, watchlist functionality, and search history. These features build on the existing search functionality (Stories 1.1a-1.1c ✅) to help users evaluate stocks and track their interests.

## Goals

- Display comprehensive stock metrics on stock cards without extra clicks
- Enable users to build and manage a personal watchlist
- Provide quick access to recently searched stocks
- All data persists locally via localStorage

## User Stories

### US-001: Display detailed metrics on stock card
**Description:** As a user, I want to see essential trading data when viewing a stock so I can evaluate it without leaving the search results.

**Acceptance Criteria:**
- [ ] Stock card displays open price
- [ ] Stock card displays high price
- [ ] Stock card displays low price
- [ ] Stock card displays market cap (formatted: $1.2B, $450M, etc.)
- [ ] Stock card displays PE ratio
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-002: Display 52-week range on stock card
**Description:** As a user, I want to see the 52-week high/low and where the current price sits so I can gauge the stock's recent performance range.

**Acceptance Criteria:**
- [ ] Stock card displays 52-week high value
- [ ] Stock card displays 52-week low value
- [ ] Visual indicator shows current price position within the 52-week range (e.g., progress bar or dot on scale)
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-003: Add stock to watchlist from stock card
**Description:** As a user, I want to add stocks to my watchlist with one click so I can track stocks I'm interested in.

**Acceptance Criteria:**
- [ ] Stock card has add-to-watchlist button/icon
- [ ] Clicking adds stock to watchlist in localStorage
- [ ] Button changes visual state when stock is in watchlist
- [ ] Confirmation message appears briefly (toast/snackbar)
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-004: Toggle watchlist state from stock card
**Description:** As a user, I want to remove stocks from my watchlist by clicking the same control so the interaction is intuitive.

**Acceptance Criteria:**
- [ ] When stock is in watchlist, control shows "active" state
- [ ] Clicking active control removes stock from watchlist
- [ ] Visual state updates immediately
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-005: View watchlist on homepage
**Description:** As a user, I want to see my watchlist on the homepage so I can monitor my tracked stocks.

**Acceptance Criteria:**
- [ ] Watchlist section appears below search area on homepage
- [ ] Each watchlist item shows: symbol, company name, current price, change ($/%)
- [ ] Empty state message when watchlist is empty
- [ ] Watchlist persists across page refreshes (localStorage)
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-006: Click watchlist item to view stock card
**Description:** As a user, I want to click a watchlist item to see full details so I can quickly review stocks I'm tracking.

**Acceptance Criteria:**
- [ ] Clicking watchlist item displays the full stock card
- [ ] Stock card shows watchlist control in active state
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-007: View search history dropdown
**Description:** As a user, I want to see my recent searches when I focus the search field so I can quickly revisit stocks.

**Acceptance Criteria:**
- [ ] Focusing empty search field shows recent search dropdown
- [ ] Dropdown shows up to 5 most recent searches
- [ ] Each item shows symbol and company name
- [ ] Most recent search appears at top
- [ ] History persists in localStorage
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-008: Select from search history
**Description:** As a user, I want to click a history item to view the stock card directly so I save time on repeat lookups.

**Acceptance Criteria:**
- [ ] Clicking history item displays full stock card immediately
- [ ] Preview list is NOT shown (bypasses preview step)
- [ ] Search field shows selected symbol
- [ ] Typecheck passes
- [ ] Verify in browser using agent-browser skill

### US-009: Track searches in history
**Description:** As a user, I want my searches to be automatically recorded so history populates naturally.

**Acceptance Criteria:**
- [ ] Clicking a preview item adds that stock to search history
- [ ] Duplicate searches move item to top (not duplicated)
- [ ] History limited to 5 items (oldest removed when full)
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Fetch and display additional quote data: open, high, low, market cap, PE ratio
- FR-2: Fetch and display 52-week high/low from API
- FR-3: Render visual range indicator showing current price position between 52-week low/high
- FR-4: Implement watchlist localStorage service (add, remove, get, check)
- FR-5: Display watchlist section on homepage below search
- FR-6: Implement search history localStorage service (add, get, limit to 5)
- FR-7: Show search history dropdown on search field focus when empty
- FR-8: All localStorage persists with keys: `diamante-watchlist`, `diamante-search-history`

## Non-Goals

- No user authentication or backend persistence
- No watchlist on a separate page/route
- No sorting or filtering of watchlist
- No manual reordering of watchlist
- No export/import of watchlist
- No search history clearing UI

## Design Considerations

- Reuse existing StockResult card layout for metric additions
- Use design tokens from index.css for all styling
- Watchlist control: icon-based (star, bookmark, or plus) with filled/outlined states
- Toast notification for watchlist add/remove confirmation
- 52-week range: horizontal bar with dot indicator for current position

## Technical Considerations

- FinnHub API provides: open, high, low, previousClose, change, percent change
- Market cap and PE ratio require `/stock/metric` endpoint with `metric=all`
- 52-week high/low available from same metric endpoint
- localStorage wrapper service for type-safe read/write
- History and watchlist stored as arrays of `{symbol, description}` objects

## Success Metrics

- All stock metrics visible on card without extra clicks
- Watchlist add/remove in single click
- Search history reduces repeat typing for frequently viewed stocks

## Open Questions

None - all resolved.

## Resolved Decisions

- Watchlist items show latest price on load, then auto-refresh every 30 seconds when user clicks/interacts
- Watchlist section includes remove icon (SVG) for direct removal without opening stock card
