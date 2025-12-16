# pCheckbox

Helper for testing PrimeNG `p-checkbox` components in Cypress.

Usage examples:

```typescript
// Parent form
cy.pCheckbox('#agree', { currentValue: false, selectValue: true });

// Chainable form
cy.get('p-checkbox').pCheckbox({ disabled: true });
```

Options:

- `disabled?: boolean` - asserts underlying input disabled/enabled
- `currentValue?: boolean` - asserts the `data-p-checked` attribute
- `selectValue?: boolean` - if provided, will click the checkbox to change to this value


