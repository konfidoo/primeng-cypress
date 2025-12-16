/// <reference types="cypress" />
import {PSelectOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

declare var cy: any;

/**
 * Core logic for testing PrimeNG Select component (p-select)
 */
export function pSelectCore(
  element: Chainable<any>,
  options: PSelectOptions = {}
): Chainable<any> {
  element.as('pSelect');

  // Resolve options with defaults without mutating the caller's object
  const resolvedOptions: PSelectOptions = {
    selectBy: 'label',
    ...options
  };

  // use `opts` locally for clarity
  const opts = resolvedOptions;

  if (!opts?.doNotScroll) {
    cy.get('@pSelect').scrollIntoView();
  }

  // basic host checks
  cy.get('@pSelect').should('exist');
  cy.get('@pSelect')
    .should('have.prop', 'nodeName')
    .and('match', /^P-SELECT$/);

  if (opts.expectClasses !== undefined) {
    ensureClasses(cy.get('@pSelect'), opts.expectClasses);
  }

  // if the caller indicates the select should be disabled, assert and return early
  if (opts.isDisabled) {
    cy.get('@pSelect').should(($el: any) => {
      const el = $el.get(0) as HTMLElement | undefined;
      const hasDisabledAttr = !!(el && (el.getAttribute('disabled') !== null || el.getAttribute('aria-disabled') === 'true'));
      const hasDisabledClass = !!(el && el.classList.contains('p-disabled'));
      if (!hasDisabledAttr && !hasDisabledClass) {
        throw new Error('Expected p-select to be disabled (disabled attribute, aria-disabled="true" or .p-disabled class)');
      }
    });

    // validate current (displayed) value if provided, then return
    if (opts.currentValue !== undefined) {
      cy.get('@pSelect').should('contain.text', opts.currentValue);
    }

    return cy.get('@pSelect');
  }

  // validate current (displayed) value if provided
  if (opts.currentValue !== undefined) {
    cy.get('@pSelect').should('contain.text', opts.currentValue);
  }

  // if no selection requested, return early
  if (opts.selectValue === undefined) {
    return cy.get('@pSelect');
  }

  // open overlay
  cy.get('@pSelect').should('be.visible').click();

  // overlay selector used by PrimeNG select
  const overlaySelector = '.p-select-overlay';
  const optionSelector = '.p-select-option';

  // wait for overlay
  cy.get(overlaySelector).should('be.visible');

  // expected option count
  if (opts.expectedOptionCount !== undefined) {
    cy.get(overlaySelector).find(optionSelector).should('have.length', opts.expectedOptionCount);
  }

  // expected options list (labels)
  if (opts.expectedOptions && Array.isArray(opts.expectedOptions)) {
    cy.get(overlaySelector)
      .find(optionSelector)
      .should('have.length.at.least', opts.expectedOptions.length)
      .each(($opt: any, idx: number) => {
        const expected = opts.expectedOptions?.[idx] ?? '';
        cy.wrap($opt).should('contain.text', expected);
      });
  }

  // find option by label or id or attribute
  const by = opts.selectBy ?? 'label';
  if (by === 'label') {
    cy.get(overlaySelector)
      .contains(optionSelector, opts.selectValue ?? '')
      .click();
  } else {
    // treat `by` as an attribute name, for example 'data-optionId'
    const attrName = String(by);
    cy.get(overlaySelector)
      .find(optionSelector)
      .then(($options: any) => {
        const arr = Array.from($options.toArray()) as HTMLElement[];
        const found = arr.find((el: HTMLElement) => {
          const attr = el.getAttribute(attrName) ?? '';
          return attr === opts.selectValue;
        });
        if (found) {
          cy.wrap(found).click();
        } else {
          // fallback: selector by attribute
          cy.get(overlaySelector).find(`[${attrName}="${opts.selectValue}"]`).click();
        }
      });
  }

  // post-selection validation
  if (!opts.skipValidation) {
    cy.get(overlaySelector).should('not.exist');
    if (opts.selectBy === 'label') {
      if (opts.selectValue !== undefined) {
        cy.get('@pSelect').should('contain.text', opts.selectValue);
      } else {
        cy.get('@pSelect').should('not.contain.text', '');
      }
    } else {
      if (opts.selectValue !== undefined) {
        cy.get('@pSelect').find(`[${opts.selectBy}="${opts.selectValue}"]`).should('exist');
      }
    }
  }

  return cy.get('@pSelect');
}

/**
 * Public helper accepting selector or chainable
 */
export function pSelect(selector?: string | Chainable<any>, options: PSelectOptions = {}): any {
  const el = typeof selector === 'string' ? cy.get(selector) : selector ?? cy.get('p-select');
  return pSelectCore(el, options);
}
