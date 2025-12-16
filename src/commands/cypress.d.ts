import {PButtonOptions, PCheckboxOptions, PConfirmDialogOptions, PTabsOptions, PToggleSwitchOptions} from './types';

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

      /**
       * Test helper for PrimeNG ToggleSwitch component
       *
       * Supports parent and chainable forms. Defaults to selecting the first `p-toggleswitch`.
       *
       * @example
       * ```typescript
       * cy.pToggleSwitch('#my-toggle', { expectChecked: true, click: true });
       * cy.get('#my-toggle').pToggleSwitch({ expectChecked: false });
       * ```
       */
      pToggleSwitch(selector: string, options?: PToggleSwitchOptions): Chainable<JQuery<HTMLElement>>;

      pToggleSwitch(options?: PToggleSwitchOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Test helper for PrimeNG Checkbox component (p-checkbox)
       *
       * Supports parent and chainable forms. Defaults to selecting the first `p-checkbox`.
       *
       * Examples:
       * ```typescript
       * cy.pCheckbox('#agree', { currentValue: false, selectValue: true });
       * cy.get('p-checkbox').pCheckbox({ disabled: true });
       * ```
       */
      pCheckbox(selector: string, options?: PCheckboxOptions): Chainable<JQuery<HTMLElement>>;

      pCheckbox(options?: PCheckboxOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Test helper for PrimeNG ConfirmDialog component (p-confirmdialog)
       *
       * Supports parent and chainable forms. Defaults to selecting the dialog with
       * the `.p-confirmdialog` root class.
       *
       * @example
       * ```typescript
       * // Parent form
       * cy.pConfirmDialog({ expectedTitle: 'Delete', expectedText: 'Are you sure?', close: 'accept' });
       *
       * // Chainable form
       * cy.get('.p-confirmdialog').pConfirmDialog({ close: 'reject' });
       * ```
       */
      pConfirmDialog(options?: PConfirmDialogOptions): Chainable<JQuery<HTMLElement>>;

      pConfirmDialog(selector: string, options?: PConfirmDialogOptions): Chainable<JQuery<HTMLElement>>;
    }
  }
}
