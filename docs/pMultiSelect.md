# pMultiSelect

The `pMultiSelect` helper provides Cypress commands for interacting with and asserting the state of PrimeNG
`p-multiselect` components. It allows you to select multiple options, validate selected values, and verify the number of
options in the overlay.

## Usage

```ts
// Parent form
cy.pMultiSelect('#cities', {
  selectValues: ['New York', 'London'],
  selectBy: 'label',
  expectedOptionCount: 5
});

// Chainable form with custom attribute selection
cy.get('#cities').pMultiSelect({
  selectValues: ['NY', 'RM'],
  selectBy: 'data-code'
});

// Only validate currently selected values without changing the selection
cy.get('#cities').pMultiSelect({
  currentValues: ['New York', 'London']
});

// Clear existing selections (requires [showClear]="true") before selecting new ones
cy.get('#cities').pMultiSelect({
  clearValues: true,
  selectValues: ['Rome', 'Paris']
});

// Keep the overlay open after selecting values
cy.get('#cities').pMultiSelect({
  selectValues: ['New York'],
  keepOpen: true
});
```

## Options

- `currentValues?: string[]` expected currently selected values (labels or attribute values, depending on `selectBy`).
- `selectValues?: string[]` values to select in the multiselect; interpreted according to `selectBy`.
- `expectedOptionCount?: number` expected number of options in the multiselect overlay panel.
- `selectBy?: 'label' | string` how to locate options: use `'label'` to match by visible label text (default) or provide
  a custom attribute name (for example `'data-code'`).
- `keepOpen?: boolean` when true, keeps the overlay open after selecting values instead of closing it with a blur-click
  on the body.
- `clearValues?: boolean` when true, clears existing selections by clicking the clear icon; requires the component to be
  configured with `[showClear]="true"`.
