import {PTabsOptions} from './types';

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
  element: any,
  options: PTabsOptions = {}
): any {
  // Verify the element is a P-TABS element
  element.should('match', 'p-tabs');

  // Check expected number of tabs
  if (typeof options.expectedTabCount === 'number') {
    element.find('.p-tab').should('have.length', options.expectedTabCount);
  }

  // Check the active tab label matches expected value
  if (options.activeTab) {
    const activeTab = element.find('.p-tab-active');
    activeTab.should('exist').and('contain.text', options.activeTab);
  }

  // Select a tab by label if requested
  if (options.select) {
    // Find the tab containing the specified label text and click it
    // Note: Assumes PrimeNG tabs structure where label is inside .p-tab element
    const tab = element.contains(options.select).closest('.p-tab');
    tab.should('be.visible').click();
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
