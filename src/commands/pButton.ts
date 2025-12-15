/// <reference types="cypress" />
import {NgButtonOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

// Declare global cy for runtime access (typed via Cypress types)
// (no `any` — the global `cy` is provided by the Cypress type declarations)

/**
 * Core logic for testing PrimeNG Button component (p-button)
 *
 * @param element - Cypress chainable element to test
 * @param options - Configuration options for button testing
 * @returns Cypress chainable for further assertions
 */
export function pButtonCore(
  element: Chainable<any>,
  options: NgButtonOptions = {}
): any {
  element.should('exist');
  element.should('have.prop', 'nodeName', 'P-BUTTON');

  // Check if button is disabled
  if (options.disabled !== undefined) {
    if (options.disabled) {
      element.find('button').should('be.disabled');
    } else {
      element.find('button').should('not.be.disabled');
    }
  }

  if (options.expectClasses !== undefined) {
    ensureClasses(element, options.expectClasses);
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
  selector: string | Chainable<any>,
  options: NgButtonOptions = {}
): any {
  // Get the button element
  const button = typeof selector === 'string'
    ? cy.get(selector)
    : selector;

  return pButtonCore(button, options);
}
