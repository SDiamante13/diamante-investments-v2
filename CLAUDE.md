## Commiting and Pushing

After completing: Update any task lists, `npm install`, commit (short message), push

## Coding Standards

- Max 150 lines/file, 25 lines/function (exclude blanks/comments)
- Cyclomatic complexity ≤10, max 6 params, nesting depth ≤4
- Semicolons, single quotes, TS strict mode
- No `any`, explicit return types (except tests), no unused vars (prefix `_`), prefer `as const`, no unsafe type ops
- Max 5% duplication (jscpd, min 5 lines/50 tokens)
- Tests: `any` allowed, return types optional

