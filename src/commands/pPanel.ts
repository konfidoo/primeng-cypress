/// <reference types="cypress" />
import type {PPanelOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

declare var cy: any;

/**
 * Core logic for testing PrimeNG Panel component (p-panel)
 *
 * @param element - Cypress chainable element to test
 * @param options - Configuration options for panel testing
 * @returns Cypress chainable for further assertions
 */
export function pPanelCore(
  element: Chainable<any>,
  options: PPanelOptions = {}
): Chainable<any> {
  element.as('pPanel');

  // Verify host element
  cy.get('@pPanel').should('have.prop', 'nodeName').and('match', /^P-PANEL$/);

  if (!options?.doNotScroll) {
    cy.get('@pPanel').scrollIntoView();
  }

  // Optionally assert title
  if (options.expectTitle !== undefined) {
    cy.get('@pPanel').find('.p-panel-header').should('contain.text', options.expectTitle);
  }

  // Ensure classes if provided
  if (options.expectClasses !== undefined) {
    ensureClasses(cy.get('@pPanel'), options.expectClasses);
  }

  // Validate toggleable flag by checking the toggleable host class
  if (options.isToggleable !== undefined) {
    if (options.isToggleable) {
      cy.get('@pPanel').should('have.class', 'p-panel-toggleable');
    } else {
      cy.get('@pPanel').should('not.have.class', 'p-panel-toggleable');
    }
  }

  // Check collapsed/expanded state when explicitly requested
  if (options.isCollapsed !== undefined) {
    if (options.isCollapsed) {
      cy.get('@pPanel').should('have.class', 'p-panel-collapsed');
    } else {
      cy.get('@pPanel').should('have.class', 'p-panel-expanded');
    }
  }

  // setState takes precedence: force expanded or collapsed regardless of current state
  if (options.setState !== undefined) {
    cy.get('@pPanel').then(($el: any) => {
      const isCurrentlyCollapsed = $el.hasClass('p-panel-collapsed');
      if (options.setState === 'expanded' && isCurrentlyCollapsed) {
        // click header button to expand
        cy.wrap($el).find('.p-panel-header').find('p-button').pButton({click: true});
        cy.wrap($el).should('have.class', 'p-panel-expanded');
        if (!options?.doNotScroll) {
          cy.wrap($el).find('.p-panel-content-container').scrollIntoView();
        }
      } else if (options.setState === 'collapsed' && !isCurrentlyCollapsed) {
        // click header button to collapse
        cy.wrap($el).find('.p-panel-header').find('p-button').pButton({click: true});
        cy.wrap($el).should('have.class', 'p-panel-collapsed');
      }
    });
    return cy.get('@pPanel');
  } else if (options.toggle === true) {
    cy.get('@pPanel').then(($el: any) => {
      const initiallyCollapsed = $el.hasClass('p-panel-collapsed');
      cy.wrap($el).find('.p-panel-header').find('p-button').pButton({click: true});
      if (initiallyCollapsed) {
        cy.wrap($el).should('have.class', 'p-panel-expanded');
        if (!options?.doNotScroll) {
          cy.wrap($el).find('.p-panel-content-container').scrollIntoView();
        }
      } else {
        cy.wrap($el).should('have.class', 'p-panel-collapsed');
      }
    });
  } else if (!options?.doNotScroll) {
    cy.get('@pPanel').scrollIntoView();
  }

  return cy.get('@pPanel');
}

/**
 * Test helper for PrimeNG Panel component (p-panel)
 *
 * Accepts a selector or a Cypress chainable element and options.
 */
export function pPanel(
  selector?: string | Chainable<any>,
  options: PPanelOptions = {}
): any {
  const el = typeof selector === 'string'
    ? cy.get(selector)
    : selector ?? cy.get('p-panel');

  return pPanelCore(el, options);
}
