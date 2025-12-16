# pSelect

Summary: Helper for asserting and interacting with PrimeNG `p-select` dropdowns.

## Usage

```ts
// Parent form
cy.pSelect('#country', {selectValue: 'Germany', selectBy: 'label'});

// Chainable form
cy.get('p-select').pSelect({selectValue: 'country_2', selectBy: 'id'});
```

## Options

- `currentValue?: string` — validates the currently displayed label text.
- `selectValue?: string` — the value to select; interpreted according to `selectBy`.
- `selectBy?: 'label' | 'id'` — whether `selectValue` refers to the option label (default) or option id/value.
- `expectedOptionCount?: number` — assert the number of options in the overlay.
- `expectedOptions?: string[]` — expected option labels (order-sensitive when provided).
- `skipValidation?: boolean` — when true, do not validate the selected value after clicking (useful when the host label
  is not stable).
- `isDisabled?: boolean` — when true, assert the host is disabled and do not attempt to open the overlay or click
  options.
