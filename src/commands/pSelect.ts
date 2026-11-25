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

  const {selectValue, expectedOptionCount} = opts;
  const expectedOptions = Array.isArray(opts.expectedOptions) ? opts.expectedOptions : [];
  if (selectValue === undefined && expectedOptionCount === undefined && expectedOptions.length === 0) {
    return cy.get('@pSelect');
  }

  const combobox = () => cy.get('@pSelect').find('[role="combobox"]');
  let openedOverlay = false;
  combobox().then(($combobox: JQuery<HTMLElement>) => {
    if ($combobox.attr('aria-expanded') !== 'true') {
      openedOverlay = true;
      cy.get('@pSelect').should('be.visible').click();
    }
  });

  // overlay selector used by PrimeNG select
  const overlaySelector = '.p-select-overlay';
  const optionSelector = '.p-select-option';

  // Wait for the overlay to exist. Animation-state waiting is opt-in because the default
  // assertions against PrimeNG's opening animation can interfere with tests that use pSelect
  // in already synchronized flows.
  cy.get(overlaySelector).should('exist');
  if (opts.waitForOverlayAnimation) {
    cy.get(overlaySelector).parent().should('not.have.class', 'ng-animating');
    cy.get(overlaySelector).should('be.visible');
  }

  // expected option count
  const overlayOptions = () => cy.get(overlaySelector).find(optionSelector);
  if (expectedOptionCount !== undefined) {
    overlayOptions().should('have.length', expectedOptionCount);
  }

  for (const [index, label] of expectedOptions.entries()) {
    overlayOptions().eq(index).should('contain.text', label);
  }

  if (selectValue === undefined) {
    cy.then(() => {
      if (openedOverlay) {
        combobox().trigger('keydown', {
          eventConstructor: 'KeyboardEvent',
          key: 'Escape',
          code: 'Escape',
          force: true,
        });
        cy.get(overlaySelector).should('not.exist');
      }
    });
    return cy.get('@pSelect');
  }

  // find option by label or id or attribute
  const by = opts.selectBy ?? 'label';
  if (by === 'label') {
    cy.get(overlaySelector)
      .contains(optionSelector, selectValue)
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
          return attr === selectValue;
        });
        if (found) {
          cy.wrap(found).click();
        } else {
          // fallback: selector by attribute
          cy.get(overlaySelector).find(`[${attrName}="${selectValue}"]`).click();
        }
      });
  }

  // wait for XHR requests triggered by the selection
  if (opts.waitFor !== undefined) {
    const aliases = Array.isArray(opts.waitFor) ? opts.waitFor : [opts.waitFor];
    aliases.forEach((alias: string) => cy.wait(alias));
  }

  // post-selection validation
  if (!opts.skipValidation) {
    cy.get(overlaySelector).should('not.exist');
    if (by === 'label') {
      cy.get('@pSelect').should('contain.text', selectValue);
    } else {
      cy.get('@pSelect').find(`[${by}="${selectValue}"]`).should('exist');
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
