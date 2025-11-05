## Commiting and Pushing

After completing a task do the following:

- Review recent commits (`git log -10 --oneline`) and update TASKS.md with checked boxes for completed work
- `npm install` (enables husky hooks)
- add files and commit (short message with high level details), don't include Claude Code or Happy as editor
- `git push`

## Coding Standards

### File and Function Size
- Max 150 lines per file (excluding blanks and comments)
- Max 25 lines per function (excluding blanks and comments)

### Function Complexity
- Cyclomatic complexity max 10
- Max 6 parameters per function
- Max nesting depth of 4

### Code Style
- Always use semicolons
- Single quotes for strings
- TypeScript strict mode enabled

### TypeScript Type Safety
- No `any` types allowed
- Explicit return types required on all functions (except test files)
- No unused variables (prefix with `_` if intentionally unused)
- Prefer `as const` for literal types
- No unsafe type operations (assignment, return, call, member access)

### Code Duplication
- Max 5% duplication threshold (jscpd)
- Min 5 lines or 50 tokens to flag as duplicate
- Enforced on pre-commit hook

### Test File Exceptions
- `any` types allowed in tests
- Explicit return types not required in tests

