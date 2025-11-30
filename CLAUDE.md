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

## Styling

- Use CSS Modules for component styling

