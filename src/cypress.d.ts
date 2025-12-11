import { NgButtonOptions } from './types';

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
    }
  }
}
