# Setup Guide for PrimeNG Cypress Commands

This guide explains how to set up `primeng-cypress` to use the Cypress command syntax (`cy.pButton()` and chainable `.pButton()`).

## Installation

```bash
npm install --save-dev primeng-cypress
```

## Setup Steps

### 1. Register Commands

Open or create your `cypress/support/e2e.ts` (or `cypress/support/commands.ts` for older Cypress versions) file and add:

```typescript
import { registerPrimeNGCommands } from 'primeng-cypress';

// Register all PrimeNG Cypress commands
registerPrimeNGCommands();
```

### 2. Add Type Definitions

Add the TypeScript type definitions to get IntelliSense and type checking.

**Option A: Global (Recommended)**

In your `cypress/support/e2e.ts` file, add at the top:

```typescript
/// <reference types="primeng-cypress/dist/cypress" />

import { registerPrimeNGCommands } from 'primeng-cypress';
registerPrimeNGCommands();
```

**Option B: Per Test File**

Add the reference directive at the top of each test file:

```typescript
/// <reference types="primeng-cypress/dist/cypress" />

describe('My Tests', () => {
  // Your tests here
});
```

**Option C: tsconfig.json**

Add to your `cypress/tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["cypress", "primeng-cypress/dist/cypress"]
  }
}
```

## Usage Examples

After setup, you can use three different syntaxes:

### 1. Direct Function Import

```typescript
import { pButton } from 'primeng-cypress';

it('test', () => {
  pButton('#btn', { expectLabel: 'Click' });
});
```

### 2. Cypress Command (cy.pButton)

```typescript
it('test', () => {
  cy.pButton('#btn', { expectLabel: 'Click', click: true });
});
```

### 3. Chainable Method (.pButton)

```typescript
it('test', () => {
  cy.get('#btn').pButton({ expectLabel: 'Click', click: true });
  
  // Can be chained with other commands
  cy.get('.container')
    .find('button')
    .pButton({ expectLabel: 'Save' })
    .should('be.visible');
});
```

## Complete Example Setup

**File: `cypress/support/e2e.ts`**

```typescript
/// <reference types="primeng-cypress/dist/cypress" />

import { registerPrimeNGCommands } from 'primeng-cypress';

// Register PrimeNG commands
registerPrimeNGCommands();

// Your other Cypress configuration
```

**File: `cypress/e2e/my-test.cy.ts`**

```typescript
describe('Button Tests', () => {
  it('should test button with cy command', () => {
    cy.visit('/my-page');
    cy.pButton('#submit', { expectLabel: 'Submit', click: true });
  });

  it('should test button with chainable', () => {
    cy.visit('/my-page');
    cy.get('.form')
      .find('button[type="submit"]')
      .pButton({ expectLabel: 'Submit', click: true });
  });
});
```

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors like "Property 'pButton' does not exist on type 'Chainable'":

1. Make sure you added the reference directive: `/// <reference types="primeng-cypress/dist/cypress" />`
2. Check that your `tsconfig.json` includes the types
3. Restart your IDE/TypeScript server

### Commands Not Working

If the commands don't work at runtime:

1. Verify `registerPrimeNGCommands()` is called in `cypress/support/e2e.ts`
2. Make sure the support file is being loaded by Cypress
3. Check the browser console for any errors

### Using with TypeScript

The library is written in TypeScript and includes full type definitions. Make sure your Cypress project is configured for TypeScript support.

## Next Steps

See the example files:
- `examples/pButton.spec.ts` - Direct function usage examples
- `examples/cypress-commands.spec.ts` - Cypress command usage examples
- `examples/USAGE.md` - Detailed usage patterns
