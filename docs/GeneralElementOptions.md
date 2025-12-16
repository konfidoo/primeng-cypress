# GeneralElementOptions

General options that can be passed to any PrimeNG component helper command.

## Usage

Examples below show using the options in the parent command form and the chainable form.

```ts
// Parent command usage
cy.pButton('#submit', {doNotScroll: true, expectClasses: ['my-btn']});

// Chainable usage
cy.get('p-button').pButton({doNotScroll: false, expectClasses: ['p-button-primary']});
```

These options are merged into each command-specific options interface (for example `PButtonOptions`, `PPanelOptions`)
and can be passed to any helper that supports them.

## Options

- `doNotScroll?: boolean` — When true, the helper will NOT scroll the element into view before assertions or
  interactions. Default behaviour (when omitted or false) is to scroll to the element to ensure it is visible for
  interactions in component tests.

- `expectClasses?: string[]` — List of CSS classes expected on the host element. Helpers use an internal `ensureClasses`
  utility to assert that each listed class is present.

## Notes

- Use `doNotScroll: true` when your test intentionally manages scrolling or when you want to assert behavior that
  depends on the element being off-screen. Disabling automatic scrolling may cause clicks or interactions to fail if the
  element is not visible in the viewport.
- `expectClasses` is a convenience that runs a positive assertion for every class in the provided array; it does not
  assert that other classes are absent.

