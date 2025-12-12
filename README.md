# primeng-cypress

[![Pull Request Tests](https://github.com/nblum/primeng-cypress/actions/workflows/ci.yml/badge.svg)](https://github.com/nblum/primeng-cypress/actions/workflows/ci.yml)

A lightweight helper library that provides Cypress test helpers for PrimeNG components (example: `pButton`).

This README explains how to run the included component tests locally and how to use this library from another project (
locally during development or as an installed dependency).

## Contents

- `lib/commands` - implementation and types for commands such as `pButton` and `registerPrimeNGCommands()`
- `cypress/` - example Cypress tests and support files that show how to register commands and mount Angular components

## Prerequisites

- Node.js (>= 16 recommended)
- npm or pnpm
- A working Cypress setup (this repo already includes `cypress.config.ts`)

## Install dependencies

From the project root:

```bash
npm install
```

or with pnpm:

```bash
pnpm install
```

## Run the example tests (local)

Open Cypress GUI:

```bash
npx cypress open
```

Run headless:

```bash
npx cypress run
```

The example spec `cypress/pButton.cy.ts` uses `cypress/angular`'s `mount` helper. The support file
`cypress/support/commands.ts` already registers the PrimeNG commands by calling `registerPrimeNGCommands()`.

## How to use this library in another project

There are multiple ways to consume this helper library from another project:

### 1) As a published package

If this repository is published to npm (example name `primeng-cypress`), simply install it and import the helper in your
Cypress support file:

```bash
npm install primeng-cypress --save-dev
```

Then in your `cypress/support/commands.ts` (or `cypress/support/e2e.ts`) add:

```ts
import {registerPrimeNGCommands} from 'primeng-cypress'

registerPrimeNGCommands()
```

This will register the `cy.pButton(...)` parent command and the chainable `.pButton()` for element subjects.

If the package exports other helpers (for example `pButton` for direct usage), import them from the package root:

```ts
import {pButton} from 'primeng-cypress'
```

### 2) Use the library during local development (recommended when working on this repo)

- Option A: `npm link`
  - From this repo:

```bash
# from primeng-cypress root
npm link
```

- In the consuming project:

```bash
npm link primeng-cypress
```

- Then import like the published package (see above).

- Option B: Use a Git dependency in `package.json` of the other project:

```json
{
  "devDependencies": {
    "primeng-cypress": "git+ssh://git@example.com/you/primeng-cypress.git#main"
  }
}
```

After installing, import `registerPrimeNGCommands` as shown above.

### TypeScript / IDE integration (important)

To get full TypeScript support and editor autocompletion for the custom commands (e.g. `cy.pButton` and `.pButton()`):

- Make sure the consuming project picks up the library's `.d.ts` declarations (this project exposes them in
  `lib/commands/cypress.d.ts`).
- In many setups you can simply import `registerPrimeNGCommands()` in your `cypress/support/commands.ts` and ensure the
  project's `tsconfig.json` includes the `cypress/` folder. Example `tsconfig.json` additions:

```jsonc
{
  "include": [
    "cypress/**/*.ts",
    "node_modules/primeng-cypress/lib/**/*.d.ts"
  ]
}
```

- If the editor does not show `cy.pButton`, try restarting the TypeScript server (in VS Code: Command Palette → "
  TypeScript: Restart TS server").

## Example usage in a test

Parent command (by selector):

```ts
cy.pButton('#submit-btn', {expectLabel: 'Submit', click: true})
```

Chainable usage after `cy.get()`:

```ts
cy.get('#submit-btn').pButton({expectLabel: 'Submit', click: true})
```

## Contributing / Running local checks

- Run TypeScript check:

```bash
npx tsc --noEmit
```

- Run Cypress example tests:

```bash
npx cypress open
```

## Troubleshooting

- "Property 'pButton' does not exist on type 'Chainable'":
  - Ensure your `tsconfig.json` includes the `cypress/**` tests and the library declaration files.
  - Restart the TypeScript server in your editor.
  - Make sure you call `registerPrimeNGCommands()` from your `cypress/support/commands.ts` so the runtime commands are
    registered before your specs run.

- "Cannot find module './commands'" during Cypress startup:
  - Verify that `lib/commands/commands.ts` exists (this repo includes the implementation).
  - Ensure relative import paths are correct in `cypress/support/commands.ts`.

## License

MIT License
