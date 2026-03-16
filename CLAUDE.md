# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@konfidoo/primeng-cypress` is an NPM library providing custom Cypress commands for testing PrimeNG components (e.g., `cy.pButton()`, `cy.pSelect()`). Source lives in `src/commands/`, built output in `lib/`.

## Commands

```bash
npm install              # Install dependencies
npm run build:lib        # Compile src/ → lib/ (run before testing local changes)
npx tsc --noEmit         # Type check without building
npm test                 # Run all Cypress component tests (headless)
npx cypress open         # Open Cypress GUI
```

To run a single test file:
```bash
npx cypress run --component --headless --spec "cypress/pButton.cy.ts"
```

## Architecture

### Source Structure (`src/commands/`)

| File | Purpose |
|------|---------|
| `types.ts` | All `P*Options` interfaces (single source of truth for types) |
| `commands.ts` | Registers all 8 Cypress commands via `cy.add()` with `prevSubject: 'optional'` |
| `cypress.d.ts` | Augments `Cypress.Chainable` with typed command signatures |
| `index.ts` | Public API — exports all helpers and types |
| `util.ts` | `ensureClasses()` utility |
| `p*.ts` | One file per PrimeNG component |

### Core/Wrapper Pattern

Every component helper uses a two-function structure:
1. **`pXxxCore(element, options)`** — contains all Cypress assertions and interactions; returns a `Chainable` for chaining
2. **`pXxx(selector?, options?)`** — resolves the subject (string selector → `cy.get()`, nothing → default selector) and delegates to core

### Dual Command Pattern

All commands use `prevSubject: 'optional'` so they work both ways:
```typescript
cy.pButton()                  // parent form — finds p-button itself
cy.get('#btn').pButton()      // chainable form — uses the yielded element
```

Command registration in `commands.ts` handles the `subject` argument: if truthy, it's passed as the element; otherwise the wrapper function resolves it.

### Build

`npm run build:lib` runs `tsc -p tsconfig.lib.json`, then copies `cypress.d.ts` to `lib/`, and appends a `/// <reference path="./cypress.d.ts" />` to `lib/index.d.ts`. Only the `lib/` directory is published to npm.

## Adding a New Component Helper

Follow this checklist (see `.github/copilot-instructions.md` for full details):

1. `src/commands/pComponentName.ts` — implement `pXxxCore()` and `pXxx()`
2. `src/commands/types.ts` — add `PXxxOptions` interface
3. `src/commands/commands.ts` — register the Cypress command
4. `src/commands/cypress.d.ts` — add overloaded signatures to `Cypress.Chainable`
5. `src/commands/index.ts` — export the function and type
6. `cypress/pComponentName.cy.ts` — add component tests (both parent and chainable forms)
7. `docs/pComponentName.md` — add documentation

## Code Style

- Prettier: 100-char line width, single quotes
- Use `export type` for type-only exports (required for `isolatedModules`)
- TypeScript strict mode; no `any` unless unavoidable