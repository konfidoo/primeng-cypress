import { NgButtonOptions, PToggleInputFieldOptions } from './types';
import { pButtonCore } from './pButton';
import { toggleInputFieldCore } from './toggleInputField';
import { e2eCore, typeTextCore } from './helpers';

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

  // Add cy.pButton() command (parent command without prevSubject)
  Cypress.Commands.add('pButton', (selector: string, options?: NgButtonOptions) => {
    return pButtonCore(cy.get(selector), options);
  });

  // Add chainable .pButton() method (child command with prevSubject: 'element')
  // Note: Cypress supports registering the same command name with different prevSubject options
  Cypress.Commands.add('pButton', { prevSubject: 'element' }, (subject: any, options?: NgButtonOptions) => {
    // Subject is already a jQuery element from previous command, wrap it to get Cypress chainable
    return pButtonCore(cy.wrap(subject), options);
  });

  // Add chainable .e2e() method for selecting by data-test attribute
  Cypress.Commands.add('e2e', { prevSubject: 'element' }, (subject: any, testId: string) => {
    return e2eCore(cy.wrap(subject), testId);
  });

  // Add chainable .typeText() method for typing text with clear
  Cypress.Commands.add('typeText', { prevSubject: 'element' }, (subject: any, text: string) => {
    return typeTextCore(cy.wrap(subject), text);
  });

  // Add chainable .toggleInputField() method (child command with prevSubject: 'element')
  Cypress.Commands.add('toggleInputField', { prevSubject: 'element' }, (subject: any, options?: PToggleInputFieldOptions) => {
    return toggleInputFieldCore(cy.wrap(subject), options);
  });
}
