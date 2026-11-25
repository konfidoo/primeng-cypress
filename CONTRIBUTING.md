Contributing to primeng-cypress

Thank you for your interest in contributing to primeng-cypress. This document explains how to set up your development
environment, run tests, implement new PrimeNG command helpers, and submit changes.

Table of contents

- Getting started
- Development setup
- Running checks and tests
- Local development (linking / building)
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
npm link @konfidoo2/primeng-cypress
```

Install dependencies (alternate package manager)
------------------------------------------------
From the project root you can install dependencies with npm or pnpm. This snippet is taken from the README for
contributors who land directly in CONTRIBUTING.md:

```bash
npm install
```

or with pnpm:

```bash
pnpm install
```

Running checks and tests
------------------------

- TypeScript type check (fast):

```bash
npx tsc --noEmit
```

The headless Cypress suites use a local installation of Google Chrome.

```bash
npm test
```

Run a single suite with `npm run test:component` or `npm run test:e2e`. The E2E script starts and stops
the Angular fixture app on `http://127.0.0.1:4200`. For interactive E2E runs, start the app with
`npm start -- --host 127.0.0.1` and open the runner with `npx cypress open --e2e`.

Local development (linking / building)
-------------------------------------
When you work on this repository and want to consume it from a local consumer project, use one of the approaches below.

#### Option A — recommended: `npm link` (quick iterative development)

1. In this repo: build the library and register a global link

```bash
cd /path/to/primeng-cypress
npm run build:lib   # builds lib/*.js and lib/*.d.ts
npm link            # registers a global symlink for @konfidoo2/primeng-cypress
```

2. In the consuming project: link the package

```bash
cd /path/to/consumer-project
# remove any existing installation first to avoid shadowing
rm -rf node_modules/@konfidoo2/primeng-cypress
npm link @konfidoo2/primeng-cypress
```

3. In the consuming project's Cypress support file (runtime registration):

```ts
import {registerPrimeNGCommands} from '@konfidoo/primeng-cypress'

registerPrimeNGCommands()
```

4. If you change source in `primeng-cypress`: rebuild and (sometimes) re-run `npm link` in the library repo so the
   consumer sees updated files:

```bash
# in primeng-cypress
npm run build:lib
# optionally re-run npm link if you changed package.json or global link
npm link
```

#### Option B — alternative stable approaches

- Use `npm pack` and install the generated tarball in the consumer project:

  ```bash
  # in primeng-cypress
  npm pack
  # in consumer (install the generated file)
  npm install /path/to/primeng-cypress/primeng-cypress-0.0.0.tgz
  ```

- Use a file: dependency in the consumer's `package.json`:

  ```json
  "devDependencies": {
    "@konfidoo/primeng-cypress": "file:../path/to/primeng-cypress"
  }
  ```

  then run `npm install` in the consumer.

- If the consumer uses `pnpm` or `yarn`, use the package manager's link equivalents instead of `npm link`.

How to add a new PrimeNG command helper
--------------------------------------
Follow these steps to add a new helper (example: `pCheckbox`):

1. Implement the core testing logic

- Create a core function implementing the checks in `src/commands/<name>.ts` (example `src/commands/pCheckbox.ts`).
- Keep logic pure and testable: accept a Cypress chainable (or selector) and an options object.

2. Add TypeScript types

- Add interfaces to `src/commands/types.ts` and export them from `src/commands/index.ts` using `export type`.

3. Add command registration

- Update `registerPrimeNGCommands()` in `src/commands/commands.ts`. Use an optional Cypress subject for commands
  that support both parent and chainable forms.

4. Add typings for the custom command

- Update `src/commands/cypress.d.ts` to include the Chainable augmentation for the new command.

5. Export public API

- Export any helper functions from `src/commands/index.ts` so they can be imported from the package root.

6. Add Cypress coverage

- Add an example spec in `cypress/<name>.cy.ts` demonstrating the helper in both usage modes (parent and chainable).
- Add the component to `cypress/fixtures/app/` and exercise the helper in `cypress/e2e/` with a browser-visible result.
- Make sure the spec is stable and does not rely on external network resources.

7. Update docs and README

- Add usage examples to `README.md` and mention the new command in the summary.

8. Run checks

```bash
npx tsc --noEmit
npm test
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
1. Update `package.json` and `package-lock.json` with `npm version <version> --no-git-tag-version`.
   Update the README compatibility table and prepare release notes from the changes since the previous version.
2. Run `npx tsc --noEmit`, `npm run build:lib`, `npm test` and `npm pack --dry-run` on the release candidate.
   Merge the release preparation through a pull request into `main`.
3. Create an annotated `vX.Y.Z` tag for the merged release commit and push the tag. The publish workflow checks
   that the tag matches the package version and stages the package on npm.
4. Create the GitHub Release using that tag and the prepared release notes. A maintainer approves the staged
   package with 2FA. Verify the exact package version in the public npm registry after approval.

Support and questions
---------------------
If you have questions, open an issue and tag it with `help wanted` or ask in the PR.

Thank you for contributing!
