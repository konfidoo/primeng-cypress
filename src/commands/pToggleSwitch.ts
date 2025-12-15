import { PSwitchOptions } from './types';

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for testing PrimeNG ToggleSwitch component (p-toggleswitch)
 *
 * @param element - Cypress chainable element to test
 * @param options - Configuration options for toggleswitch testing
 * @returns Cypress chainable for further assertions
 */
export function pToggleSwitchCore(
  element: any,
  options: PSwitchOptions = { setActive: true }
): any {
  // Verify the element is a P-TOGGLE-SWITCH or P-TOGGLESWITCH
  element
    .should('have.prop', 'nodeName')
    .and('match', /^P-TOGGLE-?SWITCH$/);

  // Check if switch is active before interaction
  if (options.isActive === true) {
    element.should('have.class', 'p-toggleswitch-checked');
  } else if (options.isActive === false) {
    element.should('not.have.class', 'p-toggleswitch-checked');
  }

  // Click the switch
  element.click();

  // Check if switch is active after interaction
  // Default behavior (when setActive is undefined or explicitly true) is to verify checked state
  if (options.setActive !== false) {
    element.should('have.class', 'p-toggleswitch-checked');
  } else {
    element.should('not.have.class', 'p-toggleswitch-checked');
  }

  return element;
}

/**
 * Test helper for PrimeNG ToggleSwitch component (p-toggleswitch)
 *
 * @param selector - CSS selector or Cypress chainable to locate the toggleswitch
 * @param options - Configuration options for toggleswitch testing
 * @returns Cypress chainable for further assertions
 *
 * @example
 * ```typescript
 * // Test a toggleswitch and set it to active
 * pToggleSwitch('#my-switch', { setActive: true });
 *
 * // Test a toggleswitch that is already active
 * pToggleSwitch('.active-switch', { isActive: true, setActive: true });
 *
 * // Use as Cypress command
 * cy.pToggleSwitch('#my-switch', { setActive: true });
 *
 * // Use as chainable method
 * cy.get('#my-switch').pToggleSwitch({ setActive: true });
 * ```
 */
export function pToggleSwitch(
  selector: string | any,
  options: PSwitchOptions = { setActive: true }
): any {
  // Get the toggleswitch element
  const toggleSwitch = typeof selector === 'string'
    ? cy.get(selector)
    : selector;

  return pToggleSwitchCore(toggleSwitch, options);
}
