/// <reference types="cypress" />
import {PButtonOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

declare var cy: any;

/**
 * Core logic for testing PrimeNG Button component (p-button)
 *
 * @param element - Cypress chainable element to test
 * @param options - Configuration options for button testing
 * @returns Cypress chainable for further assertions
 */
export function pButtonCore(
  element: Chainable<any>,
  options: PButtonOptions = {}
): Chainable<any> {
  element.as('pButton');

  cy.get('@pButton').should('match', 'p-button');
  const button = cy.get('@pButton').find('button');
  button.should('exist');

  if (options.disabled !== undefined) {
    button.should(options.disabled ? 'be.disabled' : 'not.be.disabled');
  }

  if (options.expectClasses !== undefined) {
    ensureClasses(cy.get('@pButton'), options.expectClasses);
  }

  if (options.expectLabel !== undefined) {
    cy.get('@pButton').should('contain.text', options.expectLabel);
  }

  if (options.click === true) {
    button.should('not.be.disabled').click();
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
  selector?: string | Chainable<any>,
  options: PButtonOptions = {}
): any {
  const button = typeof selector === 'string'
    ? cy.get(selector)
    : selector ?? cy.get('p-button');

  return pButtonCore(button, options);
}
