Summary

A small helper to test PrimeNG `p-panel` components. It validates the host element, optional header title, collapsed/expanded state and can toggle the panel using the header button. Additionally it can assert the `toggleable` host class and force a specific panel state with `setState`.

## Usage

```ts
// Parent form (select by CSS selector)
cy.pPanel('#my-panel', { expectTitle: 'Header', isCollapsed: false });

// Chainable form (after cy.get)
cy.get('p-panel').pPanel({ toggle: true, expectTitle: 'Details' });

// Force a specific state regardless of current state
cy.get('#my-panel').pPanel({ setState: 'collapsed' });

// Assert the panel is toggleable (checks host class)
cy.get('#my-panel').pPanel({ isToggleable: true });
```

## Options

- `isCollapsed?: boolean` — Assert the panel is initially collapsed when true or expanded when false using the content region's `aria-hidden` attribute.
- `isToggleable?: boolean` — Assert whether the panel is toggleable by checking for the presence (or absence) of the host class `p-panel-toggleable`. This option only validates the host class and does not trigger a toggle action.
- `toggle?: boolean` — Click the header's toggle button and assert that the panel changes state.
- `expectTitle?: string` — Expect the panel header to contain this text. This checks the header area (`.p-panel-header`) for the given substring.
- `setState?: 'expanded' | 'collapsed'` — Set the requested state, clicking the toggle button only when needed. This takes precedence over `toggle`. Use `isCollapsed` to assert the initial state before the change.
