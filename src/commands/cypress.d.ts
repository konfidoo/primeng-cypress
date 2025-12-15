import { NgButtonOptions, PToggleInputFieldOptions } from './types';

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
       * Select an element by data-test attribute
       *
       * @param testId - Value of the data-test attribute
       * @returns Cypress chainable for the found element
       *
       * @example
       * ```typescript
       * cy.get('#container').e2e('submit-button').click();
       * ```
       */
      e2e(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Type text into an input field, clearing it first
       *
       * @param text - Text to type
       * @returns Cypress chainable for further assertions
       *
       * @example
       * ```typescript
       * cy.get('input').typeText('Hello World');
       * ```
       */
      typeText(text: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Test helper for input field editing workflow
       *
       * Performs a complete edit cycle: verify initial value, click edit, enter value, accept, verify final value
       *
       * @param options - Configuration options for the input field test
       * @returns Cypress chainable for further assertions
       *
       * @example
       * ```typescript
       * cy.get('#my-form').toggleInputField({ 
       *   expectedValue: 'Initial Value',
       *   inputValue: 'New Value' 
       * });
       * ```
       */
      toggleInputField(options?: PToggleInputFieldOptions): Chainable<JQuery<HTMLElement>>;
    }
  }
}
