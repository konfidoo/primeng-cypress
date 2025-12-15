// Helper commands for test operations

// Declare global cy for runtime access
declare var cy: any;

/**
 * Helper to select elements by data-test attribute
 * 
 * @param element - Parent element to search within
 * @param testId - Value of the data-test attribute
 * @returns Cypress chainable for the found element
 * 
 * @example
 * ```typescript
 * cy.get('#container').e2e('submit-button').click();
 * ```
 */
export function e2eCore(element: any, testId: string): any {
  return element.find(`[data-test="${testId}"]`);
}

/**
 * Helper to type text with clearing existing content first
 * 
 * @param element - Input element to type into
 * @param text - Text to type
 * @returns Cypress chainable for further assertions
 * 
 * @example
 * ```typescript
 * cy.get('input').typeText('Hello World');
 * ```
 */
export function typeTextCore(element: any, text: string): any {
  return element.clear().type(text);
}
