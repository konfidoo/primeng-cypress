# pCheckbox

Helper for testing PrimeNG `p-checkbox` components in Cypress. It can assert disabled state, current checked
state, and optionally change the value via clicking in both parent and chainable forms.

## Usage:

```typescript
// Parent form
cy.pCheckbox('#agree', {currentValue: false, selectValue: true});

// Chainable form
cy.get('p-checkbox').pCheckbox({disabled: true});
```

## Options

- `disabled?: boolean` — asserts underlying input disabled/enabled.
- `currentValue?: boolean` — asserts the current checked state (true/false).
- `selectValue?: boolean` — if provided, will click the checkbox to change to this value.
- `toggle?: boolean` — when true, will click to flip the current state (ignored when `selectValue` is set).
