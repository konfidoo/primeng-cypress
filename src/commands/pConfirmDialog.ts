/// <reference types="cypress" />
import {PConfirmDialogOptions} from './types';
import Chainable = Cypress.Chainable;

declare var cy: any;

export const DEFAULT_SELECTOR = '.p-confirmdialog';
const titleSelector = '.p-dialog-title';
const messageSelector = '.p-confirmdialog-message';
const actionSelectors = {
  accept: '.p-confirmdialog-accept-button',
  reject: '.p-confirmdialog-reject-button',
};

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
  element
    .should('have.length', 1)
    .then(($target: JQuery<HTMLElement>) =>
      $target.is(DEFAULT_SELECTOR) ? cy.wrap($target) : cy.wrap($target).find(DEFAULT_SELECTOR)
    )
    .as('pConfirmDialog');

  const dialog = () => cy.get('@pConfirmDialog');

  // Ensure visibility unless explicitly disabled
  if (!options.doNotScroll) {
    dialog().scrollIntoView();
  }

  dialog().should('be.visible');

  if (options.expectedTitle) {
    dialog().find(titleSelector).should('contain.text', options.expectedTitle);
  }
  if (options.expectedText) {
    dialog().find(messageSelector).should('contain.text', options.expectedText);
  }

  const action = options.close;
  if (action) {
    dialog().then(($dialog: JQuery<HTMLElement>) => {
      cy.wrap($dialog).find(actionSelectors[action]).click();
      cy.wrap($dialog).should(($closedDialog: JQuery<HTMLElement>) => {
        expect(Cypress.dom.isDetached($closedDialog), 'dialog removed').to.equal(true);
      });
    });
    return undefined;
  }

  return dialog();
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
