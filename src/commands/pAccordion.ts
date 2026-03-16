/// <reference types="cypress" />
import type {PAccordionOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

declare var cy: any;

/**
 * Core logic for testing PrimeNG Accordion component (p-accordion)
 *
 * @param element - Cypress chainable element to test
 * @param options - Configuration options for accordion testing
 * @returns Cypress chainable for further assertions
 */
export function pAccordionCore(
  element: Chainable<any>,
  options: PAccordionOptions = {}
): Chainable<any> {
  element.as('pAccordion');

  if (!options.doNotScroll) {
    cy.get('@pAccordion').scrollIntoView();
  }

  cy.get('@pAccordion').should('match', 'p-accordion');

  if (options.expectClasses !== undefined) {
    ensureClasses(cy.get('@pAccordion'), options.expectClasses);
  }

  if (typeof options.expectedPanelCount === 'number') {
    cy.get('@pAccordion').find('p-accordion-panel').should('have.length', options.expectedPanelCount);
  }

  // Assert which panel is currently active by matching header text
  if (options.activePanel !== undefined) {
    cy.get('@pAccordion')
      .find('p-accordion-panel[data-p-active="true"]')
      .find('p-accordion-header')
      .should('contain.text', options.activePanel);
  }

  // Open a panel by clicking its header (matched by visible text)
  if (options.openPanel !== undefined) {
    cy.get('@pAccordion')
      .contains('p-accordion-header', options.openPanel)
      .click();
    cy.get('@pAccordion')
      .find('p-accordion-panel[data-p-active="true"]')
      .find('p-accordion-header')
      .should('contain.text', options.openPanel);
  }

  return cy.get('@pAccordion');
}

/**
 * Test helper for PrimeNG Accordion component (p-accordion)
 *
 * Accepts a selector or a Cypress chainable element and options.
 */
export function pAccordion(
  selector?: string | Chainable<any>,
  options: PAccordionOptions = {}
): any {
  const el = typeof selector === 'string'
    ? cy.get(selector)
    : selector ?? cy.get('p-accordion');

  return pAccordionCore(el, options);
}
