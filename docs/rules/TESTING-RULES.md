## Browser Test Artifacts

- Store browser screenshots under `docs/test-artifacts/<story>/`, never in the repository root.

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
