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

- `isCollapsed?: boolean` — Assert the panel host is initially collapsed when true or expanded when false. This performs a class-based assertion against `p-panel-collapsed` / `p-panel-expanded`.
- `isToggleable?: boolean` — Assert whether the panel is toggleable by checking for the presence (or absence) of the host class `p-panel-toggleable`. This option only validates the host class and does not trigger a toggle action.
- `toggle?: boolean` — If true, the helper will click the header's `p-button` to toggle the panel state. When used the helper reads the current state and asserts the state flips (collapsed→expanded or expanded→collapsed).
- `expectTitle?: string` — Expect the panel header to contain this text. This checks the header area (`.p-panel-header`) for the given substring.
- `setState?: 'expanded' | 'collapsed'` — Forcefully set the panel state regardless of current state. When provided, this option takes precedence over `toggle` and `isCollapsed`. The helper reads the current host classes and, if needed, clicks the header `p-button` to reach the requested state, then asserts the resulting class (`p-panel-expanded` or `p-panel-collapsed`).
