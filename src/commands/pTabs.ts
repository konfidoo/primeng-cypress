import { PTabsOptions } from './types';

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
  element.should('have.prop', 'nodeName', 'P-TABS');

  // Select a tab by label if requested
  if (options.select) {
    // Find the tab containing the specified label text
    element.contains(options.select).closest('.p-tab').should('be.visible').click();
    // Verify the tab has the active class
    element.contains(options.select).closest('.p-tab').should('have.class', 'p-tab-active');
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
