## Architecture

**Component Hierarchy:**
```
App → StockSearch (state container)
  ├→ SearchForm → StockPreviewList → StockPreviewItem
  └→ StockResult (after selection)
```

**Data Flow:** User input → `useStockPreviews()` → preview list → click → `useStockData()` → `StockResult`

**API Integration:** All calls in `src/services/finnhub/finnhub.ts` (exports: `searchStock()`, `getQuote()`, `getStockData()`)

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

## TDD Process for New Features

- Outside-in acceptance tests first (render full App, not components)
- Use MSW for HTTP stubbing, never vitest mocks
- Component tests only for implementation details (CSS, colors)
- Wait between tests for refactoring opportunities

## Story Implementation

- Work on one thin slice at a time (e.g., Story 1.1 only)
- No gold-plating or features beyond acceptance criteria
- Ask clarifying questions one-by-one before planning

## Acceptance Test Guidelines

**Note: These guidelines apply to acceptance tests. Unit tests can be more pragmatic.**

### DAMP over DRY
- Prioritize descriptive and meaningful phrases over reducing duplication
- Test data should be visible in test bodies (not hidden in helpers)
- Duplicate assertions are OK if they make each test's intent clearer
- Only extract helpers when semantic meaning improves readability

### Helper Naming Convention
- `given*` - Test setup (API mocks, data fixtures)
- `when*` - User actions (clicks, typing, navigation)
- `then*` - Assertions (what user sees/experiences)
- Example: `givenSearchReturnsNoMatches()`, `whenUserSearchesFor('AAPL')`, `thenUserSeesStockDetails({...})`

### Helper Extraction Criteria
- Extract if used 2+ times AND has clear semantic name
- Extract to hide implementation details (DOM queries, waitFor boilerplate)
- DON'T extract if inline data is more readable than function call
- DON'T extract for one-off operations

**Moving to Shared File:**
- Keep helpers local to test file until 2+ acceptance test files need them
- Move to shared test helper file when multiple acceptance tests need same helpers
- Only share truly reusable helpers (e.g., `whenUserClicksButton()`)
- Don't share domain-specific helpers used by single feature tests

### Helper Parameters
- Pass test data as parameters (don't hide in helper)
- Use structured objects when data has semantic meaning: `{symbol, description}`
- Use primitives for simple cases: `'AAPL'`, `/no results/i`
- Wrong: `thenUserSeesAppleStock()` - hides data
- Right: `thenUserSeesStockDetails({symbol: 'AAPL', ...})` - data visible

### Abstraction Consistency
- Don't mix raw `expect()` calls with helpers in same test
- All assertions should use helpers OR all should be inline
- Wrong: `await thenUserSees('X')` then `expect(screen.getByText('Y'))`
- Right: `await thenUserSees('X')` then `await thenUserSees('Y')`

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

