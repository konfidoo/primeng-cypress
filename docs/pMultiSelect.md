# pMultiSelect

The `pMultiSelect` helper provides Cypress commands for interacting with and asserting the state of PrimeNG
`p-multiselect` components. It allows you to select multiple options, validate selected values, verify the number of
options in the overlay, and handle disabled state and clear/keep-open behaviors in a consistent way.

## Usage

```ts
// Parent form
cy.pMultiSelect('#cities', {
  selectValues: ['New York', 'London'],
  selectBy: 'label',
  expectedOptionCount: 5,
});

// Chainable form with custom attribute selection
cy.get('#cities').pMultiSelect({
  selectValues: ['NY', 'RM'],
  selectBy: 'data-code',
});

// Only validate currently selected values without changing the selection
cy.get('#cities').pMultiSelect({
  currentValues: ['New York', 'London'],
});

// Clear existing selections (requires [showClear]="true") before selecting new ones
cy.get('#cities').pMultiSelect({
  clearValues: true,
  selectValues: ['Rome', 'Paris'],
});

// Keep the overlay open after selecting values
cy.get('#cities').pMultiSelect({
  selectValues: ['New York'],
  keepOpen: true,
});

// Close the overlay by clicking outside (blur) instead of on the host element
cy.get('#cities').pMultiSelect({
  selectValues: ['London'],
  closeByBlur: true,
});

// Assert disabled state (attribute or .p-disabled) without trying to open the overlay
cy.get('#cities-disabled').pMultiSelect({
  isDisabled: true,
  currentValues: ['New York'], // optional, to validate label text while disabled
});

// Skip scrolling into view when you know the element is already visible
cy.get('#cities-no-scroll').pMultiSelect({
  doNotScroll: true,
  selectValues: ['Paris'],
});
```

## Options

- `currentValues?: string[]` expected currently selected values (labels or attribute values, depending on `selectBy`).
- `selectValues?: string[]` values to select in the multiselect; interpreted according to `selectBy`.
- `expectedOptionCount?: number` expected number of options in the multiselect overlay panel.
- `selectBy?: 'label' | string` how to locate options: use `'label'` to match by visible label text (default) or provide
  a custom attribute name (for example `'data-code'`).
- `keepOpen?: boolean` when true, keeps the overlay open after selecting values instead of closing it at the end of the
  helper.
- `closeByBlur?: boolean` when true, closes the overlay by clicking on the page background (blur) instead of clicking
  the host element.
- `clearValues?: boolean` when true, clears existing selections by clicking the clear icon; requires the component to be
  configured with `[showClear]="true"`.
- `isDisabled?: boolean` when true, asserts that the host is disabled (via `disabled`, `aria-disabled="true"` or
  `.p-disabled`) and avoids interacting with the overlay.
- `doNotScroll?: boolean` when true, the helper will **not** scroll the element into view before interacting.
- `expectClasses?: string[]` additional CSS classes expected on the host element; fails if classes are missing.
