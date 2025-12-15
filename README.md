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
- primeNG (>= 20 recommended)
- A working Cypress setup

## How to use this library in another project

There are multiple ways to consume this helper library from another project:

### 1) As a published package

Simply install the package from npm:

```bash
npm install primeng-cypress --save-dev
```

Then in your `cypress/support/commands.ts` (or `cypress/support/e2e.ts`) add:

```ts
import {registerPrimeNGCommands} from 'primeng-cypress'

registerPrimeNGCommands()
```

This will register the commands globally so you can use them in your tests.

If the package exports other helpers (for example `pButton`, `pTabs` for direct usage), import them from the package
root:

```ts
import {pButton, pTabs} from 'primeng-cypress'
```

### TypeScript / IDE integration (important)

To get full TypeScript support and editor autocompletion for the custom commands (e.g. `cy.pButton` and `.pButton()`):

- This project exposes the declaration for the Cypress augmentations at `lib/commands/cypress.d.ts` and the package root
  types file `lib/index.d.ts` references it. After installing the package the consumer should have
  `node_modules/primeng-cypress/lib/commands/cypress.d.ts` available.

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

- After changing `tsconfig.json`, restart the TypeScript server in your editor (VS Code: Command Palette →
  "TypeScript: Restart TS server").

### Quick troubleshooting (consumer)

- If you see "Property 'pButton' does not exist on type 'Chainable'":
  1. Ensure `node_modules/primeng-cypress/lib/commands/cypress.d.ts` exists in the consumer project.
  2. Ensure your `tsconfig.json` includes that path (see snippet above).
  3. Restart the TypeScript server.
  4. Ensure you call `registerPrimeNGCommands()` in the Cypress support file so the runtime command exists.

## Contributing / Running local checks

- For development and contribution instructions, see `CONTRIBUTING.md` which contains build, linking, and local
  development workflows.

## License

MIT License
