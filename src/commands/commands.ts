// filepath: /home/nico-blum/projects/primeng-cypress/lib/commands/commands.ts
// Register Cypress commands for PrimeNG components

import {PButtonOptions, PTabsOptions, PToggleSwitchOptions} from './types';
import {pButtonCore} from './pButton';
import {pTabsCore} from './pTabs';
import {pToggleSwitchCore} from './pToggleSwitch';

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

  // Add cy.pButton() command (supports optional selector and prevSubject)
  Cypress.Commands.add(
    'pButton',
    {prevSubject: 'optional'},
    (subject: any, selectorOrOptions?: string | PButtonOptions, options?: PButtonOptions) => {
      const selector = typeof selectorOrOptions === 'string' ? selectorOrOptions : undefined;
      const resolvedOptions = typeof selectorOrOptions === 'string' ? options : selectorOrOptions;

      const buttonChainable = subject
        ? cy.wrap(subject)
        : selector
          ? cy.get(selector)
          : cy.get('p-button');

      return pButtonCore(buttonChainable, resolvedOptions);
    }
  );

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

  // Add cy.pToggleSwitch() command (supports optional prevSubject)
  Cypress.Commands.add(
    'pToggleSwitch',
    {prevSubject: 'optional'},
    (subject: any, selectorOrOptions?: string | PToggleSwitchOptions, options?: PToggleSwitchOptions) => {
      const selector = typeof selectorOrOptions === 'string' ? selectorOrOptions : undefined;
      const resolvedOptions = typeof selectorOrOptions === 'string' ? options : selectorOrOptions;

      const toggleChainable = subject
        ? cy.wrap(subject)
        : selector
          ? cy.get(selector)
          : cy.get('p-toggleswitch');

      return pToggleSwitchCore(toggleChainable, resolvedOptions);
    }
  );
}
