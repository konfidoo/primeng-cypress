import { NgButtonOptions } from './types';

/**
 * Test helper for PrimeNG Button component (p-button)
 * 
 * @param selector - CSS selector or Cypress chainable to locate the button
 * @param options - Configuration options for button testing
 * @returns Cypress chainable for further assertions
 * 
 * @example
 * ```typescript
 * // Test a button with label verification
 * pButton('#submit-btn', { expectLabel: 'Submit', click: true });
 * 
 * // Test a disabled button
 * pButton('.cancel-btn', { disabled: true, expectLabel: 'Cancel' });
 * ```
 */
export function pButton(
  selector: string | Cypress.Chainable<JQuery<HTMLElement>>,
  options: NgButtonOptions = {}
): Cypress.Chainable<JQuery<HTMLElement>> {
  // Get the button element
  const button = typeof selector === 'string' 
    ? cy.get(selector) 
    : selector;

  // Verify the element exists
  button.should('exist');

  // Check if button is disabled
  if (options.disabled !== undefined) {
    if (options.disabled) {
      button.should('be.disabled');
    } else {
      button.should('not.be.disabled');
    }
  }

  // Check expected label
  if (options.expectLabel !== undefined) {
    button.should('contain.text', options.expectLabel);
  }

  // Click the button if requested
  if (options.click === true) {
    // Ensure button is not disabled before clicking
    button.should('not.be.disabled').click();
  }

  return button;
}
