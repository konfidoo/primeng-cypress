# primeng-cypress

[![Pull Request Tests](https://github.com/nblum/primeng-cypress/actions/workflows/ci.yml/badge.svg)](https://github.com/nblum/primeng-cypress/actions/workflows/ci.yml)

A lightweight helper library that provides Cypress test helpers for PrimeNG components (examples: `pButton`, `pTabs`).

This README explains how to run the included component tests locally and how to use this library from another project (
locally during development or as an installed dependency).

## Contents

- `lib/commands` - implementation and types for commands such as `pButton`, `pTabs`, and `registerPrimeNGCommands()`
- `cypress/` - example Cypress tests and support files that show how to register commands and mount Angular components

## Supported components

- `pButton` — see [`docs/pButton.md`](docs/pButton.md) for usage and examples.
- `pTabs` — see [`docs/pTabs.md`](docs/pTabs.md) for usage and examples.

## Not yet supported components

- Any PrimeNG component beyond the helpers listed above (e.g., `pTabMenu`, `pAccordion` wrappers) is not currently
  exposed by this library.

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

The example specs `cypress/pButton.cy.ts` and `cypress/pTabs.cy.ts` use `cypress/angular`'s `mount` helper. The support
file
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

This will register the `cy.pButton(...)`, `cy.pTabs(...)` parent commands and their chainable versions for element
subjects.

If the package exports other helpers (for example `pButton`, `pTabs` for direct usage), import them from the package
root:

```ts
import {pButton, pTabs} from 'primeng-cypress'
```

### 2) Use the library during local development (recommended when working on this repo)

This project already builds type declarations into `lib/` and `package.json` contains `main`, `types` and `files` so
consuming projects can pick up `lib/index.js` and `lib/index.d.ts` automatically. Below are reliable copy/paste
steps for local development.

#### Option A — recommended: `npm link` (quick iterative development)

1. In this repo: build the library and register a global link

   ```bash
   cd /path/to/primeng-cypress
   npm run build:lib   # builds lib/*.js and lib/*.d.ts
   npm link            # registers a global symlink for primeng-cypress
   ```

2. In the consuming project: link the package

   ```bash
   cd /path/to/consumer-project
   # remove any existing installation first to avoid shadowing
   rm -rf node_modules/primeng-cypress
   npm link primeng-cypress
   ```

3. In the consuming project's Cypress support file (runtime registration):

   ```ts
   import { registerPrimeNGCommands } from 'primeng-cypress'
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
    "primeng-cypress": "file:../path/to/primeng-cypress"
  }
  ```

  then run `npm install`.

- If the consumer uses `pnpm` or `yarn`, use `pnpm link` / `yarn link` equivalents instead of `npm link`.

### TypeScript / IDE integration (important)

To get full TypeScript support and editor autocompletion for the custom commands (e.g. `cy.pButton` and `.pButton()`):

- This project exposes the declaration for the Cypress augmentations at `lib/commands/cypress.d.ts` and the package root
  types file `lib/index.d.ts` references it. After linking/installing the consumer should have
  `node_modules/primeng-cypress/lib/commands/cypress.d.ts`.

- If your editor/TS server does not pick up the augmentation automatically, add the following to the consumer's
  `tsconfig.json` `include` (copy/paste):

  ```jsonc
  {
    "include": [
      "cypress/**/*.ts",
      "node_modules/primeng-cypress/lib/**/*.d.ts",
      "...other includes..."
    ]
  }
  ```

- Alternatively, add the package lib folder to `typeRoots` (less common):

  ```jsonc
  {
    "compilerOptions": {
      "typeRoots": [
        "node_modules/@types",
        "node_modules/primeng-cypress/lib"
      ]
    }
  }
  ```

- After changing `tsconfig.json` or after linking, restart the TypeScript server in your editor (VS Code: Command
  Palette →
  "TypeScript: Restart TS server").

### Quick troubleshooting (local usage)

- If you see "Property 'pButton' does not exist on type 'Chainable'":
  1. Ensure `node_modules/primeng-cypress/lib/commands/cypress.d.ts` exists in the consumer project.
  2. Ensure your `tsconfig.json` includes that path (see snippet above).
  3. Restart the TypeScript server.
  4. Ensure you call `registerPrimeNGCommands()` in the Cypress support file so the runtime command exists.

- If the link doesn't resolve (module not found):
  - Ensure you ran `npm link` in the library and `npm link primeng-cypress` in the consumer.
  - Verify `ls -l node_modules/primeng-cypress` in the consumer shows a symlink to your local repo.

- If you prefer not to use linking or your package manager behaves differently (pnpm): use `npm pack` or `file:`
  install.

## Example usage in a test

### pButton

Parent command (by selector):

```ts
cy.pButton('#submit-btn', {expectLabel: 'Submit', click: true})
```

Chainable usage after `cy.get()`:

```ts
cy.get('#submit-btn').pButton({expectLabel: 'Submit', click: true})
```

### pTabs

See the dedicated [`pTabs` guide](docs/pTabs.md) for detailed usage and the example test formerly shown here.

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
