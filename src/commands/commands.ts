// filepath: /home/nico-blum/projects/primeng-cypress/lib/commands/commands.ts
// Register Cypress commands for PrimeNG components

import {
  PButtonOptions,
  PCheckboxOptions,
  PConfirmDialogOptions,
  PPanelOptions,
  PSelectOptions,
  PTabsOptions,
  PToggleSwitchOptions
} from './types';
import {pButtonCore} from './pButton';
import {pTabsCore} from './pTabs';
import {pToggleSwitchCore} from './pToggleSwitch';
import {pCheckboxCore} from './pCheckbox';
import {pConfirmDialogCore} from './pConfirmDialog';
import {pPanelCore} from './pPanel';
import {pSelectCore} from './pSelect';

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
 * import { registerPrimeNGCommands } from '@konfidoo/primeng-cypress';
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

  // Add cy.pCheckbox() command (supports optional prevSubject)
  Cypress.Commands.add(
    'pCheckbox',
    {prevSubject: 'optional'},
    (subject: any, selectorOrOptions?: string | PCheckboxOptions, options?: PCheckboxOptions) => {
      const selector = typeof selectorOrOptions === 'string' ? selectorOrOptions : undefined;
      const resolvedOptions = typeof selectorOrOptions === 'string' ? options : selectorOrOptions;

      const checkboxChainable = subject
        ? cy.wrap(subject)
        : selector
          ? cy.get(selector)
          : cy.get('p-checkbox');

      return pCheckboxCore(checkboxChainable, resolvedOptions);
    }
  );

  // Add cy.pConfirmDialog() command (supports optional prevSubject)
  Cypress.Commands.add(
    'pConfirmDialog',
    {prevSubject: 'optional'},
    (subject: any, selectorOrOptions?: string | PConfirmDialogOptions, options?: PConfirmDialogOptions) => {
      const selector = typeof selectorOrOptions === 'string' ? selectorOrOptions : undefined;
      const resolvedOptions = typeof selectorOrOptions === 'string' ? options : selectorOrOptions;

      const confirmChainable = subject
        ? cy.wrap(subject)
        : selector
          ? cy.get(selector)
          : cy.get('.p-confirmdialog');

      return pConfirmDialogCore(confirmChainable, resolvedOptions);
    }
  );

  // Add cy.pPanel() command (supports optional prevSubject)
  Cypress.Commands.add(
    'pPanel',
    {prevSubject: 'optional'},
    (subject: any, selectorOrOptions?: string | PPanelOptions, options?: PPanelOptions) => {
      const selector = typeof selectorOrOptions === 'string' ? selectorOrOptions : undefined;
      const resolvedOptions = typeof selectorOrOptions === 'string' ? options : selectorOrOptions;

      const panelChainable = subject
        ? cy.wrap(subject)
        : selector
          ? cy.get(selector)
          : cy.get('p-panel');

      return pPanelCore(panelChainable, resolvedOptions);
    }
  );

  // Add cy.pSelect() command (supports optional prevSubject)
  Cypress.Commands.add(
    'pSelect',
    {prevSubject: 'optional'},
    (subject: any, selectorOrOptions?: string | PSelectOptions, options?: PSelectOptions) => {
      const selector = typeof selectorOrOptions === 'string' ? selectorOrOptions : undefined;
      const resolvedOptions = typeof selectorOrOptions === 'string' ? options : selectorOrOptions;

      const selectChainable = subject
        ? cy.wrap(subject)
        : selector
          ? cy.get(selector)
          : cy.get('p-select');

      return pSelectCore(selectChainable, resolvedOptions);
    }
  );
}
