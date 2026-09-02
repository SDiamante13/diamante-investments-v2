## Architecture

**Component Hierarchy:**
```
App → StockSearch (tab state)
  ├→ StockTabs
  ├→ StockSearchPanel (Search tab)
  │    ├→ SearchForm → StockPreviewList (matches, then recent) → StockPreviewItem
  │    └→ StockResult → StockRange
  └→ WatchlistView (Watchlist tab)
```

**Hook Composition:**
```
StockSearch
  ├→ useStockSearchFlow (query, dropdown open state, match suppression)
  │    ├→ useStockPreviews → useDebounce
  │    └→ useRecordedSearch
  │         ├→ useStockData
  │         └→ useSearchHistory → usePersistedList
  └→ useSelectedWatchlist → useWatchlist → usePersistedList
```

**Data Flow:** User input → `useStockPreviews()` → matches list → click → `useStockData()` → `StockResult`. A
successful load is recorded by `useRecordedSearch`, which feeds the `Recent` list on the next focus.

**API Integration:** All calls in `src/services/finnhub/finnhub.ts` (exports: `searchStock()`, `getQuote()`, `getProfile()`, `getMetrics()`, `getStockData()`). `getStockData()` uses `Promise.allSettled` — quote is required, profile2/metric degrade gracefully.

Finnhub may return error-shaped HTTP 200 responses. Runtime-validate required quote data before mapping it to domain types.

**Types:** Two-layer structure
- `src/services/finnhub/types.ts` - Raw API responses
- `src/types/stock.ts` - App domain types
- Service converts Finnhub → app types

**Data Fetching Hooks:** `src/hooks/`
- `useStockPreviews(query)` - Debounced search preview
- `useStockData(symbol)` - Full stock data fetch
- `useWatchlist()` - localStorage-backed watchlist under `diamante.watchlist.v1`; pure watchlist operations live in `src/utils/watchlist.ts`
- `useSearchHistory()` - localStorage-backed search history under `diamante.searchHistory.v1`, capped at 5; pure operations live in `src/utils/searchHistory.ts`
- `usePersistedList(key, isItem)` - shared localStorage list persistence (parse, `{ items: [...] }` shape check, per-row validation, corrupt-storage fallback). Both list hooks build on it; its setter only accepts functional updates.

**Navigation:** Story 1.3 uses same-page `Search` and `Watchlist` tabs, not routing.

**Search dropdown:** `SearchForm` owns one absolutely-positioned dropdown containing the matches list, the
no-matches note, then the `Recent` list. It opens on focus *and* click (clicking an already-focused input
fires no focus event) and closes on blur and on select. The dropdown wrapper prevents `mousedown` default so
a row click lands before the input blurs. `StockPreviewList` is generic over `StockListRow { symbol;
description }` and renders a named region - `Matches`, or `Recent` when given a `heading`.

**Search history:** A search is recorded only when a stock card loads successfully, so `loadStockData`
resolves to `StockData | null` (null for no-result and for superseded requests). Selecting a recent row fills
the input with its symbol, so `useStockSearchFlow` suppresses matches for that exact query until the user
types again. Symbols visible under `Matches` are excluded from `Recent`.

## Commiting

When asked to commit: update any task lists, run `npm install`, commit (short message)

## Coding Standards

- Max 150 lines/file, 40 lines/function (exclude blanks/comments)
- Cyclomatic complexity ≤10, max 6 params, nesting depth ≤4
- Semicolons, single quotes, TS strict mode
- No `any`, explicit return types (except tests), no unused vars (prefix `_`), prefer `as const`, no unsafe type ops
- Max 5% duplication (jscpd, min 5 lines/50 tokens)
- Tests: `any` allowed, return types optional

## React

- Use `ReactElement` for component return types (import from 'react')
- Never use `React.JSX.Element` or `JSX.Element` (requires React namespace import)
- Prefer type imports: `import type { ReactElement } from 'react'`

## Story Implementation

- Work on one thin slice at a time (e.g., Story 1.1 only)
- No gold-plating or features beyond acceptance criteria
- Ask clarifying questions one-by-one before planning

# Testing Rules

Read docs/rules/TESTING-RULES.md when working with automated tests or QA verification

## Styling

- Use CSS Modules for component styling
- Use design tokens from `index.css` (never hardcode colors, spacing, fonts, shadows, borders, or animation values)
- Token structure: primitive tokens (`--color-*`, `--space-*`) → semantic tokens (`--bg-*`, `--text-*`, `--accent-*`)
- Typography: `--font-display` (Space Grotesk, titles), `--font-mono` (JetBrains Mono, data/tickers), `--font-body` (IBM Plex Sans, text)
- Spacing scale: Use `--space-{1,2,3,4,5,6,8,10,12,16,20}` for margins, padding, gaps
- Animations: Use `--duration-*` and `--ease-*` tokens, always respect `prefers-reduced-motion`
- Color semantics: Use `--text-positive`/`--text-negative` for gains/losses (not `--color-green-*`/`--color-crimson-*` directly)
- Shadows: Use `--shadow-{sm,md,lg}` scale, `--shadow-inset` for recessed inputs
- Border tokens: Use `--border-width-*` and `--border-radius-*` (never hardcode px values)
- Font scale: `xs/sm/base/lg/xl/2xl/3xl/4xl/5xl` - pick appropriate size for hierarchy
