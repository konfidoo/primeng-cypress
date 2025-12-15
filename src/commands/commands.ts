// filepath: /home/nico-blum/projects/primeng-cypress/lib/commands/commands.ts
// Register Cypress commands for PrimeNG components

import { NgButtonOptions, PSwitchOptions } from './types';
import { pButtonCore } from './pButton';
import { pToggleSwitchCore } from './pToggleSwitch';

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
  Cypress.Commands.add('pButton', { prevSubject: 'element' }, (subject: any, options?: NgButtonOptions) => {
    // Subject is already a jQuery element from previous command, wrap it to get Cypress chainable
    return pButtonCore(cy.wrap(subject), options);
  });

  // Add cy.pToggleSwitch() command (parent command without prevSubject)
  Cypress.Commands.add('pToggleSwitch', (selector: string, options?: PSwitchOptions) => {
    return pToggleSwitchCore(cy.get(selector), options);
  });

  // Add chainable .pToggleSwitch() method (child command with prevSubject: 'element')
  Cypress.Commands.add('pToggleSwitch', { prevSubject: 'element' }, (subject: any, options?: PSwitchOptions) => {
    // Subject is already a jQuery element from previous command, wrap it to get Cypress chainable
    return pToggleSwitchCore(cy.wrap(subject), options);
  });
}

