import { PToggleInputFieldOptions } from './types';

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for toggleInputField command
 * 
 * This command helps test input field editing workflows that involve:
 * 1. Verifying the initial readonly value
 * 2. Clicking an edit button
 * 3. Entering a new value
 * 4. Clicking an accept button
 * 5. Verifying the new value is displayed in readonly mode
 *
 * @param element - Cypress chainable element (container) to test
 * @param options - Configuration options for the input field test
 * @returns Cypress chainable for further assertions
 */
export function toggleInputFieldCore(
  element: any,
  options: PToggleInputFieldOptions = {}
): any {
  const { inputValue, expectedValue } = options;

  // Verify the element is visible
  element.should('be.visible');

  // If expectedValue is provided, verify the readonly field has that value
  if (expectedValue !== undefined) {
    element.e2e('value-field-readonly').should('have.value', expectedValue);
  }

  // Click the edit button
  element.e2e('btn-edit-values').click();

  // If inputValue is provided, type it into the value field
  if (inputValue !== undefined) {
    element.e2e('value-field').typeText(inputValue);
  }

  // Click the accept changes button
  element.e2e('btn-accept-changes').click();

  // If inputValue is provided, verify the readonly field now has that value
  if (inputValue !== undefined) {
    element.e2e('value-field-readonly').should('have.value', inputValue);
  }

  return element;
}

/**
 * Test helper for input field editing workflow
 *
 * @param selector - CSS selector or Cypress chainable to locate the container element
 * @param options - Configuration options for the input field test
 * @returns Cypress chainable for further assertions
 *
 * @example
 * ```typescript
 * // Test input field editing with expected initial value
 * cy.get('#my-form').toggleInputField({ 
 *   expectedValue: 'Initial Value',
 *   inputValue: 'New Value' 
 * });
 * ```
 */
export function toggleInputField(
  selector: string | any,
  options: PToggleInputFieldOptions = {}
): any {
  // Get the container element
  const container = typeof selector === 'string'
    ? cy.get(selector)
    : selector;

  return toggleInputFieldCore(container, options);
}
