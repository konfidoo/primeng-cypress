Contributing to primeng-cypress

Thank you for your interest in contributing to primeng-cypress. This document explains how to set up your development environment, run tests, implement new PrimeNG command helpers, and submit changes.

Table of contents
- Getting started
- Development setup
- Running checks and tests
- How to add a new PrimeNG command helper
- Coding style and guidelines
- Commit messages and PR process
- Publishing & releasing
- Support and questions

Getting started
---------------
- Fork the repository and create a feature branch from `main`.
- Keep your branch focused on a single logical change.

Development setup
-----------------
1. Clone your fork and install dependencies:

```bash
git clone git@github.com:youruser/primeng-cypress.git
cd primeng-cypress
npm install
```

2. Optional: Use `npm link` for local development when consuming the library from another project:

```bash
# in this repository
npm link
# in the consuming project
npm link primeng-cypress
```

Running checks and tests
------------------------
- TypeScript type check (fast):

```bash
npx tsc --noEmit
```

- Run example Cypress specs (uses `cypress/` in this repo):

Open GUI:
```bash
npx cypress open
```

Run headless:
```bash
npx cypress run
```

How to add a new PrimeNG command helper
--------------------------------------
Follow these steps to add a new helper (example: `pCheckbox`):

1. Implement the core testing logic
   - Create a core function implementing the checks in `lib/commands/<name>.ts` (example `lib/commands/pCheckbox.ts`).
   - Keep logic pure and testable: accept a Cypress chainable (or selector) and an options object.

2. Add TypeScript types
   - Add interfaces to `lib/commands/types.ts` or a new file `lib/commands/<name>.types.ts` and export them from `lib/commands/index.ts` using `export type` for type-only exports.

3. Add command registration
   - Add a function to `lib/commands/commands.ts` if needed or update the existing `registerPrimeNGCommands()` to register the new command:
     - Parent command: `Cypress.Commands.add('pCheckbox', (selector, options) => {...})`
     - Chainable command: `Cypress.Commands.add('pCheckbox', { prevSubject: 'element' }, (subject, options) => {...})`

4. Add typings for the custom command
   - Update `lib/commands/cypress.d.ts` to include the Chainable augmentation for the new command so editors pick it up.

5. Export public API
   - Export any helper functions from `lib/commands/index.ts` so they can be imported from the package root.

6. Add a Cypress spec
   - Add an example spec in `cypress/<name>.cy.ts` demonstrating the helper in both usage modes (parent and chainable).
   - Make sure the spec is stable and does not rely on external network resources.

7. Update docs and README
   - Add usage examples to `README.md` and mention the new command in the summary.

8. Run checks

```bash
npx tsc --noEmit
npx cypress run --spec "cypress/<name>.cy.ts"
```

Coding style and guidelines
---------------------------
- Use TypeScript for implementation.
- All inline code comments in source files must be written in English.
- Keep functions small and single-responsibility.
- Use clear, self-descriptive names for types and options.
- Use `export type` when re-exporting types to satisfy `isolatedModules` if your tsconfig has it enabled.

Commit messages and PR process
-----------------------------
- Commit early with clear messages.
- Open a PR against `main` with a short description of the change, rationale, and testing steps.
- Include before/after behavior and examples.
- Request reviews from maintainers and address comments promptly.

Publishing & releasing
----------------------
If this project will be published to npm, the recommended flow is:

1. Add a `prepare` or `build` script in `package.json` to transpile or prepare files if needed.
2. Update `package.json` `version` and run `npm publish` (or use `npm version <patch|minor|major>` then `npm publish`).

For local testing in a consuming repo, `npm link` or `npm pack` are convenient methods.

Support and questions
---------------------
If you have questions, open an issue and tag it with `help wanted` or ask in the PR.

Thank you for contributing!

