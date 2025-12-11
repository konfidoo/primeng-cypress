# primeng-cypress

Cypress test functions for PrimeNG components. This library provides easy-to-use test helpers for testing PrimeNG UI components in Cypress.

## Installation

```bash
npm install --save-dev primeng-cypress
```

## Requirements

- Cypress >= 10.0.0
- PrimeNG >= 17.0.0

## Usage

Import the test functions in your Cypress test files:

```typescript
import { pButton } from 'primeng-cypress';
```

### pButton

Test helper for PrimeNG Button component (`p-button`).

#### API

```typescript
pButton(selector: string | Cypress.Chainable, options?: NgButtonOptions)
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

**Basic label verification:**
```typescript
pButton('#submit-btn', { expectLabel: 'Submit' });
```

**Test disabled button:**
```typescript
pButton('.cancel-btn', { 
  disabled: true, 
  expectLabel: 'Cancel' 
});
```

**Click a button:**
```typescript
pButton('#action-btn', { 
  expectLabel: 'Save',
  click: true 
});
```

**Complete test:**
```typescript
pButton('.primary-button', {
  disabled: false,
  expectLabel: 'Submit Form',
  click: true
});
```

**Using with Cypress chainable:**
```typescript
const button = cy.get('.my-button');
pButton(button, { expectLabel: 'Click Me' });
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
