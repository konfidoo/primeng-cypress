/// <reference types="cypress" />
import {PTabsOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for testing PrimeNG Tabs component (p-tabs)
 *
 * @param element - Cypress chainable element to test
 * @param options - Configuration options for tabs testing
 * @returns Cypress chainable for further assertions
 */
export function pTabsCore(
  element: Chainable<any>,
  options: PTabsOptions = {}
): Chainable<any> {
  // give the element an alias for easier reference
  element.as('pTabs');

  // Verify the element is a P-TABS element
  cy.get('@pTabs').should('match', 'p-tabs');
  cy.get('@pTabs').find('p-tabpanels').should('exist');

  if (options.expectClasses !== undefined) {
    ensureClasses(cy.get('@pTabs'), options.expectClasses);
  }

  // Check expected number of tabs
  if (typeof options.expectedTabCount === 'number') {
    cy.get('@pTabs').find('.p-tab').should('have.length', options.expectedTabCount);
  }

  // Check the active tab label matches expected value
  if (options.activeTab) {
    const activeTab = cy.get('@pTabs').find('[aria-selected="true"]');
    // const activeTab = element.find();
    activeTab.should('contain', options.activeTab);
  }

  // Select a tab by label if requested
  if (options.select) {
    // Find the tab containing the specified label text and click it
    // Note: Assumes PrimeNG tabs structure where label is inside .p-tab element
    const tab = cy.get('@pTabs').contains(options.select).closest('.p-tab');
    tab.should('be.visible')
    tab.click();
    // Verify the tab has the active class
    tab.should('have.class', 'p-tab-active');
  }

  return element;
}

/**
 * Test helper for PrimeNG Tabs component (p-tabs)
 *
 * @param selector - CSS selector or Cypress chainable to locate the tabs
 * @param options - Configuration options for tabs testing
 * @returns Cypress chainable for further assertions
 *
 * @example
 * ```typescript
 * // Select a tab by label
 * pTabs('p-tabs', { select: 'Tab 1' });
 *
 * // Use as Cypress command
 * cy.pTabs('p-tabs', { select: 'Tab 1' });
 *
 * // Use as chainable method
 * cy.get('p-tabs').pTabs({ select: 'Tab 2' });
 * ```
 */
export function pTabs(
  selector: string | any,
  options: PTabsOptions = {}
): any {
  // Get the tabs element
  const tabs = typeof selector === 'string'
    ? cy.get(selector)
    : selector;

  return pTabsCore(tabs, options);
}
