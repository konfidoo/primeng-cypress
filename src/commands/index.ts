/**
 * PrimeNG Cypress Test Helpers
 *
 * Provides Cypress test functions for PrimeNG components
 */

/// <reference path="./cypress.d.ts" />

export {pButton} from './pButton';
export {pTabs} from './pTabs';
export {pToggleSwitch} from './pToggleSwitch';
export {pCheckbox} from './pCheckbox';
export {pConfirmDialog} from './pConfirmDialog';
export {pPanel} from './pPanel';
export {pSelect} from './pSelect';
export type {
  PButtonOptions,
  PTabsOptions,
  PToggleSwitchOptions,
  PCheckboxOptions,
  PConfirmDialogOptions,
  PPanelOptions,
  PSelectOptions
} from './types';
export {registerPrimeNGCommands} from './commands';
