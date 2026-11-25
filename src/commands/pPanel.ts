/// <reference types="cypress" />
import type {PPanelOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

declare var cy: any;

const contentSelector = '.p-panel-content-container';
const toggleSelector = 'button.p-panel-toggle-button, p-button[aria-expanded] button';
const isCollapsed = ($content: JQuery<HTMLElement>): boolean =>
  $content.attr('aria-hidden') === 'true';

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

  // PrimeNG 21 can omit aria-hidden on an initially expanded panel.
  const content = () => cy.get('@pPanel').children(contentSelector).should('exist');
  const expectCollapsed = (collapsed: boolean) =>
    content().should(($content: JQuery<HTMLElement>) => {
      expect(isCollapsed($content), 'panel collapsed').to.equal(collapsed);
    });
  if (options.isCollapsed !== undefined) {
    expectCollapsed(options.isCollapsed);
  }

  if (options.setState !== undefined || options.toggle === true) {
    content().then(($content: JQuery<HTMLElement>) => {
      const collapsed = isCollapsed($content);
      const target = options.setState === undefined ? !collapsed : options.setState === 'collapsed';
      if (collapsed === target) {
        return;
      }

      cy.get('@pPanel').children('.p-panel-header').find(toggleSelector).click();
      expectCollapsed(target);
      if (!target && !options.doNotScroll) {
        content().scrollIntoView();
      }
    });
  }

  // Always scroll into view for visibility in tests
  if (!options?.doNotScroll) {
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
