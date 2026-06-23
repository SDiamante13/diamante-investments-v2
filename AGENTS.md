## Architecture

**Component Hierarchy:**
```
App → StockSearch (state container)
  ├→ SearchForm → StockPreviewList → StockPreviewItem
  └→ StockResult (after selection)
```

**Data Flow:** User input → `useStockPreviews()` → preview list → click → `useStockData()` → `StockResult`

**API Integration:** All calls in `src/services/finnhub/finnhub.ts` (exports: `searchStock()`, `getQuote()`, `getProfile()`, `getMetrics()`, `getStockData()`). `getStockData()` uses `Promise.allSettled` — quote is required, profile2/metric degrade gracefully.

Finnhub may return error-shaped HTTP 200 responses. Runtime-validate required quote data before mapping it to domain types.

**Types:** Two-layer structure
- `src/services/finnhub/types.ts` - Raw API responses
- `src/types/stock.ts` - App domain types
- Service converts Finnhub → app types

**Data Fetching Hooks:** `src/hooks/`
- `useStockPreviews(query)` - Debounced search preview
- `useStockData(symbol)` - Full stock data fetch

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
