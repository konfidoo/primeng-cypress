# pAccordion

A small helper to test PrimeNG `p-accordion` components. It validates the host element, optional panel count, currently
active panel header text, and can open a panel by clicking its header.

## Usage

```ts
// Parent form (select by CSS selector)
cy.pAccordion('#faq', {expectedPanelCount: 3, openPanel: 'Section 1'});

// Chainable form (after cy.get)
cy.get('p-accordion').pAccordion({activePanel: 'Section 2'});

// Assert count and open a panel together
cy.pAccordion({expectedPanelCount: 2, openPanel: 'Details'});
```

## Options

- `activePanel?: string` — Assert that the panel with this header text is currently active/expanded. Checks for a
  `p-accordion-panel[data-p-active="true"]` child whose `p-accordion-header` contains the given text.
- `openPanel?: string` — Open the panel whose `p-accordion-header` contains this text by clicking it, then verifies the
  panel becomes active.
- `expectedPanelCount?: number` — Assert the number of `p-accordion-panel` children inside the accordion.
- `expectClasses?: string[]` — Assert that the accordion host element has all the specified CSS classes.
- `doNotScroll?: boolean` — When true, skips the automatic `scrollIntoView` call on the host element.
