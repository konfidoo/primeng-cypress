# pTabs

The `pTabs` helper command streamlines Cypress testing of PrimeNG `p-tabs` components. It selects a tab by its label and
checks that `p-tab-active` is applied, plus it offers options for expected tab count and asserting the active tab label.

## Usage

Parent command (by selector):

```ts
cy.pTabs('p-tabs', {select: 'Tab 2'})
```

Chainable usage after `cy.get()`:

```ts
cy.get('p-tabs').pTabs({select: 'Tab 2'})
```

## How it works

1. Verifies that the element is a `P-TABS` component.
2. If the `select` option is provided:
  - Finds the tab containing the requested label text.
  - Clicks the tab via `.closest('.p-tab')`.
  - Validates that the tab receives the `p-tab-active` class after selection.

## Example test

```typescript
import {Component} from '@angular/core';
import {Tabs} from 'primeng/tabs';

it('selects a tab by label', () => {
  @Component({
    imports: [Tabs],
    template: `
      <p-tabs [(value)]="activeTab">
        <p-tabpanel header="Tab 1">
          <p>Content for Tab 1</p>
        </p-tabpanel>
        <p-tabpanel header="Tab 2">
          <p>Content for Tab 2</p>
        </p-tabpanel>
      </p-tabs>
    `
  })
  class TestHostComponent {
    activeTab: number = 0;
  }

  cy.mount(TestHostComponent, {imports: [Tabs]});
  cy.get('p-tabs').pTabs({select: 'Tab 2'});
  cy.contains('Content for Tab 2').should('be.visible');
});
```

