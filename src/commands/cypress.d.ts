import { NgButtonOptions, PSwitchOptions } from './types';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Test helper for PrimeNG Button component (p-button)
       *
       * @param selector - CSS selector to locate the button
       * @param options - Configuration options for button testing
       * @returns Cypress chainable for further assertions
       *
       * @example
       * ```typescript
       * cy.pButton('#submit-btn', { expectLabel: 'Submit', click: true });
       * cy.pButton('.cancel-btn', { disabled: true });
       * ```
       */
      pButton(selector: string, options?: NgButtonOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Test helper for PrimeNG Button component (p-button) - chainable version
       *
       * Use this after getting an element with cy.get()
       *
       * @param options - Configuration options for button testing
       * @returns Cypress chainable for further assertions
       *
       * @example
       * ```typescript
       * cy.get('#submit-btn').pButton({ expectLabel: 'Submit', click: true });
       * cy.get('.cancel-btn').pButton({ disabled: true });
       * ```
       */
      pButton(options?: NgButtonOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Test helper for PrimeNG ToggleSwitch component (p-toggleswitch)
       *
       * @param selector - CSS selector to locate the toggleswitch
       * @param options - Configuration options for toggleswitch testing
       * @returns Cypress chainable for further assertions
       *
       * @example
       * ```typescript
       * cy.pToggleSwitch('#my-switch', { setActive: true });
       * cy.pToggleSwitch('.active-switch', { isActive: true, setActive: true });
       * ```
       */
      pToggleSwitch(selector: string, options?: PSwitchOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Test helper for PrimeNG ToggleSwitch component (p-toggleswitch) - chainable version
       *
       * Use this after getting an element with cy.get()
       *
       * @param options - Configuration options for toggleswitch testing
       * @returns Cypress chainable for further assertions
       *
       * @example
       * ```typescript
       * cy.get('#my-switch').pToggleSwitch({ setActive: true });
       * cy.get('.active-switch').pToggleSwitch({ isActive: true, setActive: true });
       * ```
       */
      pToggleSwitch(options?: PSwitchOptions): Chainable<JQuery<HTMLElement>>;
    }
  }
}
