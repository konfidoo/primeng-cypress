/// <reference types="cypress" />
import {PConfirmDialogOptions} from './types';
import Chainable = Cypress.Chainable;

declare var cy: any;

export const DEFAULT_SELECTOR = '.p-confirmdialog';
const DEFAULT_TITLE = '.p-confirmdialog .p-dialog-title';
const DEFAULT_MESSAGE = '.p-confirmdialog .p-confirmdialog-message';
const DEFAULT_ACCEPT = '.p-confirmdialog .p-confirmdialog-accept-button';
const DEFAULT_REJECT = '.p-confirmdialog .p-confirmdialog-reject-button';

/**
 * Core logic for testing PrimeNG ConfirmDialog component
 *
 * This helper validates presence, optional title/message assertions and
 * can optionally close the dialog by accepting or rejecting.
 */
export function pConfirmDialogCore(
  element: Chainable<any>,
  options: PConfirmDialogOptions = {}
): Chainable<any> | undefined {
  element.as('pConfirmDialog');

  // Ensure visibility unless explicitly disabled
  if (!options?.doNotScroll) {
    cy.get(DEFAULT_SELECTOR).scrollIntoView();
  }

  cy.get(DEFAULT_SELECTOR).should('be.visible');

  if (options.expectedTitle) {
    cy.get(DEFAULT_TITLE).should('contain.text', options.expectedTitle);
  }
  if (options.expectedText) {
    cy.get(DEFAULT_MESSAGE).should('contain.text', options.expectedText);
  }

  if (options.close) {
    if (options.close === 'accept') {
      cy.get(DEFAULT_ACCEPT).click();
    } else if (options.close === 'reject') {
      cy.get(DEFAULT_REJECT).click();
    }
    cy.get(DEFAULT_SELECTOR).should('not.exist');
    return undefined
  } else {
    return cy.get(DEFAULT_SELECTOR);
  }
}

/**
 * Test helper for PrimeNG ConfirmDialog component
 *
 * Accepts a selector or a Cypress chainable element and options.
 */
export function pConfirmDialog(
  selector?: string | Chainable<any>,
  options: PConfirmDialogOptions = {}
): any {
  const el = typeof selector === 'string'
    ? cy.get(selector)
    : selector ?? cy.get(DEFAULT_SELECTOR);

  return pConfirmDialogCore(el, options);
}
