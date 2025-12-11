import { NgButtonOptions } from './types';
import { pButtonCore } from './pButton';

// Declare global Cypress and cy for runtime access
declare var Cypress: any;
declare var cy: any;

/**
 * Register PrimeNG Cypress commands
 * 
 * Call this function in your cypress/support/e2e.ts or cypress/support/commands.ts file:
 * 
 * @example
 * ```typescript
 * import { registerPrimeNGCommands } from 'primeng-cypress';
 * registerPrimeNGCommands();
 * ```
 */
export function registerPrimeNGCommands(): void {
  // Check if Cypress is available
  if (typeof Cypress === 'undefined' || typeof cy === 'undefined') {
    throw new Error('Cypress is not available. Make sure to call this function in a Cypress environment.');
  }

  // Add cy.pButton() command
  Cypress.Commands.add('pButton', (selector: string, options?: NgButtonOptions) => {
    return pButtonCore(cy.get(selector), options);
  });

  // Add chainable .pButton() method
  Cypress.Commands.addAll({
    prevSubject: 'element'
  }, {
    pButton(subject: any, options?: NgButtonOptions) {
      return pButtonCore(cy.wrap(subject), options);
    }
  });
}
