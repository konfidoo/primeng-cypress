import {PButtonOptions, PTabsOptions} from './types';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Test helper for PrimeNG Button component (p-button)
       *
       * Accepts an optional selector and defaults to the first `<p-button>` on the page.
       * Supports both parent (`cy.pButton(...)`) and chainable (`cy.get(...).pButton(...)`) forms
       * thanks to the shared optional prevSubject registration in `registerPrimeNGCommands()`.
       *
       * @example
       * ```typescript
       * cy.pButton('#submit-btn', { expectLabel: 'Submit', click: true });
       * cy.pButton({ expectClasses: ['primary'], expectLabel: 'Primary' });
       * cy.get('p-button').pButton({ click: true });
       * ```
       */
      pButton(selector: string, options?: PButtonOptions): Chainable<JQuery<HTMLElement>>;

      pButton(options?: PButtonOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Test helper for PrimeNG Tabs component (p-tabs)
       *
       * @param selector - CSS selector to locate the tabs
       * @param options - Configuration options for tabs testing
       * @returns Cypress chainable for further assertions
       *
       * @example
       * ```typescript
       * cy.pTabs('p-tabs', { select: 'Tab 1' });
       * ```
       */
      pTabs(selector: string, options?: PTabsOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Test helper for PrimeNG Tabs component (p-tabs) - chainable version
       *
       * Use this after getting an element with cy.get()
       *
       * @param options - Configuration options for tabs testing
       * @returns Cypress chainable for further assertions
       *
       * @example
       * ```typescript
       * cy.get('p-tabs').pTabs({ select: 'Tab 2' });
       * ```
       */
      pTabs(options?: PTabsOptions): Chainable<JQuery<HTMLElement>>;
    }
  }
}
