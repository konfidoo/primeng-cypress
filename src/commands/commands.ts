// filepath: /home/nico-blum/projects/primeng-cypress/lib/commands/commands.ts
// Register Cypress commands for PrimeNG components

import {NgButtonOptions, PTabsOptions} from './types';
import {pButtonCore} from './pButton';
import {pTabsCore} from './pTabs';

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
  Cypress.Commands.add('pButton', {prevSubject: 'element'}, (subject: any, options?: NgButtonOptions) => {
    // Subject is already a jQuery element from previous command, wrap it to get Cypress chainable
    return pButtonCore(cy.wrap(subject), options);
  });

  // Add cy.pTabs() command (supports optional prevSubject to act as parent or child)
  Cypress.Commands.add(
    'pTabs',
    {prevSubject: 'optional'},
    (subject: any, selectorOrOptions?: string | PTabsOptions, options?: PTabsOptions) => {
      // Determine if the parent call passed a selector string
      const selector = typeof selectorOrOptions === 'string' ? selectorOrOptions : undefined;
      const resolvedOptions = typeof selectorOrOptions === 'string' ? options : selectorOrOptions;

      const tabsChainable = subject
        ? cy.wrap(subject)
        : selector
          ? cy.get(selector)
          : cy.get('p-tabs');

      return pTabsCore(tabsChainable, resolvedOptions);
    }
  );
}
