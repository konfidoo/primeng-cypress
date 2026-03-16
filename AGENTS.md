# Repository Guidelines

## Project Structure & Module Organization
`src/commands/` contains the published TypeScript helpers, command registration, shared types, and Cypress type augmentation. Add new component helpers in files such as `src/commands/pSelect.ts`, then export them from `src/commands/index.ts` and update `src/commands/cypress.d.ts` if the command extends `cy`.

`cypress/` holds component specs (`*.cy.ts`), fixtures, and support setup used to verify the helpers locally. `docs/` contains one Markdown usage page per supported PrimeNG component. Core project config lives in `package.json`, `cypress.config.ts`, `angular.json`, and the `tsconfig*.json` files.

## Build, Test, and Development Commands
Install dependencies with `npm install`.

- `npm run build` builds the Angular workspace.
- `npm run build:lib` transpiles the library into `lib/` and refreshes the bundled type declarations.
- `npm run watch` rebuilds the Angular project in development mode.
- `npm test` runs all Cypress component specs headlessly from `cypress/**/*.cy.ts`.
- `npx cypress open` starts the Cypress UI for interactive component testing.
- `npx tsc --noEmit` is the fastest type-check before opening a PR.

## Coding Style & Naming Conventions
Use TypeScript, 2-space indentation, UTF-8, trailing-whitespace cleanup, and single quotes where possible; these rules are reflected in `.editorconfig` and Prettier settings. Keep helper functions focused and option interfaces explicit. Follow the existing naming pattern: `p<Component>.ts` for helpers, `P<Component>Options` for exported types, and `p<Component>.cy.ts` for specs. Write inline source comments in English.

## Testing Guidelines
This repository relies on Cypress component tests for behavioral coverage. Every new helper or option change should include or update a matching `cypress/p<Component>.cy.ts` spec and, when relevant, a `docs/p<Component>.md` example page. Prefer deterministic tests with no external network dependencies. Run `npm test` before submitting; use `npx cypress run --component --spec "cypress/pSelect.cy.ts"` to target one spec.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects such as `adds support for pMultiSelect` or `Update src/commands/pSelect.ts`. Keep commits focused on one helper or API change. PRs should target `main` and include a concise summary, rationale, test commands run, and before/after usage examples when command behavior changes.
