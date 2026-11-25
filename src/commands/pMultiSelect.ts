/// <reference types="cypress" />
import {PMultiSelectOptions} from './types';
import {ensureClasses} from './util';

declare var cy: any;

const overlaySelector = '.p-multiselect-overlay';
const optionSelector =
  '.p-multiselect-option, .p-multiselect-item, li[role="option"][aria-selected], p-multiselectitem';

const getHost = () => cy.get('@pMultiSelect');
const getCombobox = () => getHost().find('input[role="combobox"]');

const getOverlaySelector = (id: string): string => `${overlaySelector}#${Cypress.$.escapeSelector(id)}`;

const pressOverlayKey = ($input: JQuery<HTMLElement>, key: 'ArrowDown' | 'Escape'): void => {
  // PrimeNG handles these keys on the visually hidden combobox input.
  cy.wrap($input).trigger('keydown', {eventConstructor: 'KeyboardEvent', key, code: key, force: true});
};

const openOverlay = (): void => {
  getCombobox().then(($input: JQuery<HTMLElement>) => {
    if ($input.attr('aria-expanded') !== 'true') {
      pressOverlayKey($input, 'ArrowDown');
    }
  });
  getCombobox().should('have.attr', 'aria-expanded', 'true');
};

const getOverlay = (): Cypress.Chainable<JQuery<HTMLElement>> =>
  getCombobox()
    .invoke('attr', 'aria-controls')
    .should('be.a', 'string')
    .then((id: string) => cy.get(getOverlaySelector(id)));

const closeOverlay = (closeByBlur = false): void => {
  getCombobox().then(($input: JQuery<HTMLElement>) => {
    const id = $input.attr('aria-controls');
    if (!id) {
      return;
    }

    if (closeByBlur) {
      // PrimeNG registers the outside-click listener after the enter motion.
      cy.get(getOverlaySelector(id)).should(($overlay: JQuery<HTMLElement>) => {
        const $motion = $overlay.closest('p-motion');
        expect($motion.css('display'), 'overlay display').not.to.equal('none');
        expect($motion.is('[data-enter-phase], .p-anchored-overlay-enter-active'), 'overlay entering')
          .to.equal(false);
      });
      cy.get('body').trigger('click', {eventConstructor: 'MouseEvent', force: true});
    } else {
      pressOverlayKey($input, 'Escape');
    }
    cy.get(getOverlaySelector(id)).should('not.exist');
  });
};

/**
 * Core logic for testing PrimeNG MultiSelect component (p-multiselect)
 *
 * This helper wraps a p-multiselect host element and provides a higher-level API to
 * validate state (current values, disabled state, classes) and interact with the
 * overlay (open, clear, select values) in a robust way.
 *
 * @param element Host element chainable (usually cy.get('p-multiselect') or a specific selector)
 * @param options Behavior and assertion options
 */
export function pMultiSelectCore(
  element: Cypress.Chainable<any>,
  options: PMultiSelectOptions = {}
): Cypress.Chainable<any> {
  element.as('pMultiSelect');

  if (!options.doNotScroll) {
    getHost().scrollIntoView();
  }
  getHost().should('match', 'p-multiselect');

  if (options.expectClasses !== undefined) {
    ensureClasses(getHost(), options.expectClasses);
  }

  if (options.isDisabled) {
    getHost().should('match', '[disabled], [aria-disabled="true"], .p-disabled');
  }

  for (const value of options.currentValues ?? []) {
    getHost().find('.p-multiselect-label, .p-multiselect-token').should('contain.text', value);
  }

  if (options.isDisabled) {
    return getHost();
  }

  const values = options.selectValues ?? [];
  if (options.expectedOptionCount !== undefined || options.clearValues || values.length > 0) {
    openOverlay();
  }

  if (options.expectedOptionCount !== undefined) {
    getOverlay().find(optionSelector).should('have.length', options.expectedOptionCount);
  }

  if (options.clearValues) {
    getHost().then(($host: JQuery<HTMLElement>) => {
      const $icon = $host.find('.p-multiselect-clear-icon');
      if (!$icon.length) {
        throw new Error(
          'clearValues is true but no .p-multiselect-clear-icon is present. Make sure [showClear]="true" is configured.'
        );
      }
      cy.wrap($icon).click({force: true});
    });

    if (options.keepOpen || values.length > 0) {
      openOverlay();
    }
  }

  const selectBy = options.selectBy ?? 'label';
  for (const value of values) {
    if (selectBy === 'label') {
      getOverlay().contains(optionSelector, value).click({force: true});
    } else {
      getOverlay().find(optionSelector).then(($options) => {
        const $option = $options.filter((_, option) => option.getAttribute(selectBy) === value);
        if ($option.length) {
          cy.wrap($option.first()).click({force: true});
        } else {
          const attribute = Cypress.$.escapeSelector(selectBy);
          const attributeValue = Cypress.$.escapeSelector(value);
          getOverlay().find(`[${attribute}="${attributeValue}"]`).click({force: true});
        }
      });
    }
  }

  if (!options.keepOpen) {
    closeOverlay(options.closeByBlur);
  }

  return getHost();
}

/**
 * Test helper for PrimeNG MultiSelect component (p-multiselect)
 *
 * Provides a Cypress command-style API that accepts either a selector string or an
 * existing chainable and forwards to pMultiSelectCore.
 *
 * @param selector CSS selector or existing chainable pointing to the host element
 * @param options Behavior and assertion options
 */
export function pMultiSelect(
  selector?: string | Cypress.Chainable<any>,
  options: PMultiSelectOptions = {}
): Cypress.Chainable<any> {
  const el = typeof selector === 'string' ? cy.get(selector) : selector ?? cy.get('p-multiselect');
  return pMultiSelectCore(el, options);
}
