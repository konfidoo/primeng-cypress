import { NgButtonOptions } from './types';

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for testing PrimeNG Button component (p-button)
 * 
 * @param element - Cypress chainable element to test
 * @param options - Configuration options for button testing
 * @returns Cypress chainable for further assertions
 */
export function pButtonCore(
  element: any,
  options: NgButtonOptions = {}
): any {
  // Verify the element exists
  element.should('exist');

  // Check if button is disabled
  if (options.disabled !== undefined) {
    if (options.disabled) {
      element.should('be.disabled');
    } else {
      element.should('not.be.disabled');
    }
  }

  // Check expected label
  if (options.expectLabel !== undefined) {
    element.should('contain.text', options.expectLabel);
  }

  // Click the button if requested
  if (options.click === true) {
    // Ensure button is not disabled before clicking
    element.should('not.be.disabled').click();
  }

  return element;
}

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
 * 
 * // Use as Cypress command
 * cy.pButton('#submit-btn', { expectLabel: 'Submit', click: true });
 * 
 * // Use as chainable method
 * cy.get('#submit-btn').pButton({ expectLabel: 'Submit', click: true });
 * ```
 */
export function pButton(
  selector: string | any,
  options: NgButtonOptions = {}
): any {
  // Get the button element
  const button = typeof selector === 'string' 
    ? cy.get(selector) 
    : selector;

  return pButtonCore(button, options);
}
