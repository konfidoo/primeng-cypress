# pTabs

The `pTabs` helper command streamlines Cypress testing of PrimeNG `p-tabs` components. It selects a tab by its label,
checks
that the active tab class is applied, and provides options to assert tab count and the active tab label.

## Usage

Parent command (by selector):

```ts
cy.pTabs('p-tabs', {select: 'Tab 2'})
```

Chainable usage after `cy.get()`:

```ts
cy.get('p-tabs').pTabs({select: 'Tab 2'})
```

## Options

- `select?: string` — Label of the tab to select and validate.
- `activeTab?: string` — Label of the currently active tab to validate.
- `expectedTabCount?: number` — Assert the expected number of tabs rendered.
- `expectClasses?: string[]` — Assert that host classes are present.
