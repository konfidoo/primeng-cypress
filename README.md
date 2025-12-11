# primeng-cypress

Cypress test functions for PrimeNG components. This library provides easy-to-use test helpers for testing PrimeNG UI components in Cypress.

## Installation

```bash
npm install --save-dev primeng-cypress
```

## Requirements

- Cypress >= 10.0.0
- PrimeNG >= 17.0.0

## Setup

### Register Cypress Commands (Recommended)

To use `cy.pButton()` and chainable `.pButton()` syntax, register the commands in your `cypress/support/e2e.ts` or `cypress/support/commands.ts` file:

```typescript
import { registerPrimeNGCommands } from 'primeng-cypress';

registerPrimeNGCommands();
```

Then add the type definitions in your `cypress/support/e2e.ts` or at the top of your test file:

```typescript
/// <reference types="primeng-cypress/dist/cypress" />
```

### Direct Function Import (Alternative)

You can also import and use the test functions directly without registering commands:

```typescript
import { pButton } from 'primeng-cypress';
```

## Usage

### pButton

Test helper for PrimeNG Button component (`p-button`).

#### API

**Direct function:**
```typescript
pButton(selector: string | Cypress.Chainable, options?: NgButtonOptions)
```

**Cypress command (after registration):**
```typescript
cy.pButton(selector: string, options?: NgButtonOptions)
```

**Chainable method (after registration):**
```typescript
cy.get(selector).pButton(options?: NgButtonOptions)
```

#### Options

```typescript
interface NgButtonOptions {
  disabled?: boolean;    // Check if button is disabled/enabled
  click?: boolean;       // Click the button
  expectLabel?: string;  // Verify button label text
}
```

#### Examples

**Using direct function:**
```typescript
import { pButton } from 'primeng-cypress';

pButton('#submit-btn', { expectLabel: 'Submit' });
pButton('.cancel-btn', { disabled: true, expectLabel: 'Cancel' });
```

**Using cy.pButton() command:**
```typescript
cy.pButton('#submit-btn', { expectLabel: 'Submit', click: true });
cy.pButton('.cancel-btn', { disabled: true });
```

**Using chainable .pButton() method:**
```typescript
cy.get('#submit-btn').pButton({ expectLabel: 'Submit', click: true });
cy.get('.cancel-btn').pButton({ disabled: true, expectLabel: 'Cancel' });

// Chain with other Cypress commands
cy.get('.container')
  .find('button.primary')
  .pButton({ expectLabel: 'Save', click: true });
```

**Complete test example:**
```typescript
it('should submit form with button click', () => {
  cy.visit('/form-page');
  
  // Fill form
  cy.get('#name').type('John Doe');
  
  // Test and click submit button using chainable syntax
  cy.get('#submit-form').pButton({
    disabled: false,
    expectLabel: 'Submit Form',
    click: true
  });
  
  // Verify success
  cy.get('.success-message').should('be.visible');
});
```

## Examples

See the `examples/` directory for more usage examples.

## Development

### Build

```bash
npm run build
```

### Structure

- `src/` - TypeScript source files
- `dist/` - Compiled JavaScript and type definitions
- `examples/` - Example test files

## License

ISC
