/// <reference types="cypress" />
import {PToggleSwitchOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for testing PrimeNG ToggleSwitch component (p-togglebutton / p-toggleswitch)
 *
 * This is a minimal skeleton that verifies the host element and provides basic
 * checks for checked/disabled state and an optional click action.
 */
export function pToggleSwitchCore(
  element: Chainable<any>,
  options: PToggleSwitchOptions = {}
): Chainable<any> {
  element.as('pToggleSwitch');

  // Verify the element exists and is a toggle-like component
  cy.get('@pToggleSwitch').should('exist');
  cy.get('@pToggleSwitch')
    .should('have.prop', 'nodeName')
    .and('match', /^P-TOGGLE-?SWITCH$/);

  if (options.expectClasses !== undefined) {
    ensureClasses(cy.get('@pToggleSwitch'), options.expectClasses);
  }


  if (options.expectChecked === true) {
    cy.get('@pToggleSwitch').should('have.class', 'p-toggleswitch-checked');
  } else if (options.expectChecked === false) {
    cy.get('@pToggleSwitch').should('not.have.class', 'p-toggleswitch-checked');
  }


  if (options.click === true) {
    cy.get('@pToggleSwitch').then(($el: any) => {
      const isInitiallyChecked = $el.hasClass('p-toggleswitch-checked');
      cy.get('@pToggleSwitch').click();
      if (isInitiallyChecked) {
        cy.get('@pToggleSwitch').should('not.have.class', 'p-toggleswitch-checked');
      } else {
        cy.get('@pToggleSwitch').should('have.class', 'p-toggleswitch-checked');
      }
    });
  }

  if (options.disabled === true) {
    cy.get('@pToggleSwitch').should('have.class', 'p-disabled');
  } else if (options.disabled === false) {
    cy.get('@pToggleSwitch').should('not.have.class', 'p-disabled');
  }

  return cy.get('@pToggleSwitch');
}

/**
 * Test helper for PrimeNG ToggleSwitch component
 *
 * Accepts a selector or a Cypress chainable element and options.
 */
export function pToggleSwitch(
  selector?: string | Chainable<any>,
  options: PToggleSwitchOptions = {}
): any {
  const el = typeof selector === 'string'
    ? cy.get(selector)
    : selector ?? cy.get('p-togglebutton');

  return pToggleSwitchCore(el, options);
}

