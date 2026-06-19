# Story 1.2 feature acceptance report

Tested `http://127.0.0.1:3000` with `agent-browser` on desktop and a 390×844 mobile viewport.

## Working as expected

- Selecting AAPL replaces previews with an accessible loading card.
- Card shows current, open, day high, day low, market cap, and P/E.
- 52-week low/high and marker render; meter announces the computed percentage.
- Mobile metrics use two columns and market cap spans both columns.
- No horizontal overflow at 390px (`scrollWidth` equals `clientWidth`).
- Automated App/MSW acceptance coverage verifies optional-endpoint degradation and P/E fallback.

## Not working as expected

- None in Story 1.2.

## UX suggestions

- Consider labeling the search input explicitly in a later accessibility story; it currently relies on placeholder text.

## Notes

- Live Finnhub happy path passed before the API began returning an error-shaped HTTP 200, likely quota-related.
- Screenshots: `docs/test-artifacts/story-1.2/test-story-1-2-desktop.png`, `docs/test-artifacts/story-1.2/test-story-1-2-mobile.png`.
