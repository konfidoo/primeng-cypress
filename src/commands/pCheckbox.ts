/// <reference types="cypress" />
import {PCheckboxOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for testing PrimeNG Checkbox component (p-checkbox)
 */
export function pCheckboxCore(
  element: Chainable<any>,
  options: PCheckboxOptions = {}
): Chainable<any> {
  element.as('pCheckbox');

  // Ensure element is visible unless explicitly disabled
  if (!options?.doNotScroll) {
    cy.get('@pCheckbox').scrollIntoView();
  }

  // Verify host element
  cy.get('@pCheckbox').should('have.prop', 'nodeName').and('match', /^P-CHECKBOX$/);

  if (options.expectClasses !== undefined) {
    ensureClasses(cy.get('@pCheckbox'), options.expectClasses);
  }

  // Check disabled state of the underlying input
  if (options.disabled !== undefined) {
    if (options.disabled) {
      cy.get('@pCheckbox').find('input[type=checkbox]').should('be.disabled');
    } else {
      cy.get('@pCheckbox').find('input[type=checkbox]').should('be.enabled');
    }
  }

  // Check current value asserted by data attribute used in some PrimeNG versions
  if (options.currentValue) {
    cy.get('@pCheckbox').should('have.attr', 'data-p-checked', 'true');
  } else if (options.currentValue === false) {
    cy.get('@pCheckbox').should('have.attr', 'data-p-checked', 'false');
  }

  // Handle changing state: selectValue takes precedence if provided, otherwise toggle flips state when requested
  if (options.selectValue !== undefined) {
    // Desired explicit state
    cy.get('@pCheckbox').then(($el: any) => {
      const current = $el.attr('data-p-checked');
      const isChecked = current === 'true';
      const desired = options.selectValue === true;
      if (isChecked !== desired) {
        cy.wrap($el).find('input[type=checkbox]').first().click();
        // verify state changed to desired
        cy.wrap($el).should('have.attr', 'data-p-checked', desired ? 'true' : 'false');
      } else {
        // already in desired state - assert to be sure
        cy.wrap($el).should('have.attr', 'data-p-checked', desired ? 'true' : 'false');
      }
    });
  } else if (options.toggle) {
    // Toggle requested: click to flip whatever the current state is
    cy.get('@pCheckbox').then(($el: any) => {
      const current = $el.attr('data-p-checked');
      const isChecked = current === 'true';
      // click to flip
      cy.wrap($el).find('input[type=checkbox]').first().click();
      // verify flipped state
      cy.wrap($el).should('have.attr', 'data-p-checked', isChecked ? 'false' : 'true');
    });
  }

  return cy.get('@pCheckbox');
}

/**
 * Convenience wrapper to accept selector or chainable
 */
export function pCheckbox(
  selector?: string | Chainable<any>,
  options: PCheckboxOptions = {}
): any {
  const el = typeof selector === 'string' ? cy.get(selector) : selector ?? cy.get('p-checkbox');
  return pCheckboxCore(el, options);
}
