/// <reference types="cypress" />
import {PToggleSwitchOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for testing PrimeNG ToggleSwitch component (p-toggleswitch)
 *
 * This is a minimal skeleton that verifies the host element and provides basic
 * checks for checked/disabled state and an optional click action.
 */
export function pToggleSwitchCore(
  element: Chainable<any>,
  options: PToggleSwitchOptions = {}
): Chainable<any> {
  element.as('pToggleSwitch');

  // Ensure visibility unless explicitly disabled
  if (!options?.doNotScroll) {
    cy.get('@pToggleSwitch').scrollIntoView();
  }

  // Verify the element exists and is a toggle-like component
  cy.get('@pToggleSwitch').should('exist');
  cy.get('@pToggleSwitch')
    .should('have.prop', 'nodeName')
    .and('match', /^P-TOGGLE-?SWITCH$/);

  if (options.expectClasses !== undefined) {
    ensureClasses(cy.get('@pToggleSwitch'), options.expectClasses);
  }

  if (options.currentValue === true) {
    cy.get('@pToggleSwitch').should('have.class', 'p-toggleswitch-checked');
  } else if (options.currentValue === false) {
    cy.get('@pToggleSwitch').should('not.have.class', 'p-toggleswitch-checked');
  }

  // If selectValue is provided, set explicit state (takes precedence over toggle)
  if (options.selectValue !== undefined) {
    cy.get('@pToggleSwitch').then(($el: any) => {
      const isChecked = $el.hasClass('p-toggleswitch-checked');
      const desired = options.selectValue === true;
      if (isChecked !== desired) {
        cy.wrap($el).click();
        // verify changed to desired
        cy.wrap($el).should(desired ? 'have.class' : 'not.have.class', 'p-toggleswitch-checked');
      } else {
        // already in desired state - assert
        cy.wrap($el).should(desired ? 'have.class' : 'not.have.class', 'p-toggleswitch-checked');
      }
    });
  } else if (options.toggle === true) {
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
    : selector ?? cy.get('p-toggleswitch');

  return pToggleSwitchCore(el, options);
}
