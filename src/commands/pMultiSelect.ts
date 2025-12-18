/// <reference types="cypress" />
import {PMultiSelectOptions} from './types';
import {ensureClasses} from './util';
import Chainable = Cypress.Chainable;

declare var cy: any;

/**
 * Core logic for testing PrimeNG MultiSelect component (p-multiselect)
 * @param element
 * @param options
 */
export function pMultiSelectCore(
  element: Chainable<any>,
  options: PMultiSelectOptions = {}
): Chainable<any> {
  element.as('pMultiSelect');

  const resolvedOptions: PMultiSelectOptions = {
    selectBy: 'label',
    ...options
  };

  const opts = resolvedOptions;

  if (!opts?.doNotScroll) {
    cy.get('@pMultiSelect').scrollIntoView();
  }

  cy.get('@pMultiSelect').should('exist');
  cy.get('@pMultiSelect')
    .should('have.prop', 'nodeName')
    .and('match', /^P-MULTISELECT$/);

  if (opts.expectClasses !== undefined) {
    ensureClasses(cy.get('@pMultiSelect'), opts.expectClasses);
  }

  // when isDisabled is provided, assert disabled state and do not interact further
  if (opts.isDisabled) {
    cy.get('@pMultiSelect').should(($el: any) => {
      const host = $el.get(0) as HTMLElement | undefined;
      const hasDisabledAttr = !!(
        host && (host.getAttribute('disabled') !== null || host.getAttribute('aria-disabled') === 'true')
      );
      const hasDisabledClass = !!(host && host.classList.contains('p-disabled'));

      if (!hasDisabledAttr && !hasDisabledClass) {
        throw new Error(
          'Expected p-multiselect to be disabled (disabled attribute, aria-disabled="true" or .p-disabled class)'
        );
      }
    });

    // optionally validate current values when disabled
    if (opts.currentValues && Array.isArray(opts.currentValues)) {
      cy.get('@pMultiSelect').within(() => {
        cy.get('.p-multiselect-label, .p-multiselect-token').then(($labels: any) => {
          const text = ($labels as any).text();
          opts.currentValues?.forEach((v: any) => {
            if (!text.includes(v)) {
              throw new Error(`Expected p-multiselect to contain current value "${v}"`);
            }
          });
        });
      });
    }

    return cy.get('@pMultiSelect');
  }

  if (opts.currentValues && Array.isArray(opts.currentValues)) {
    cy.get('@pMultiSelect').within(() => {
      cy.get('.p-multiselect-label, .p-multiselect-token').then(($labels: any) => {
        const text = ($labels as any).text();
        opts.currentValues?.forEach((v: any) => {
          if (!text.includes(v)) {
            throw new Error(`Expected p-multiselect to contain current value "${v}"`);
          }
        });
      });
    });
  }

  // if no new selection and no clear requested, return early
  if ((!opts.selectValues || opts.selectValues.length === 0) && !opts.clearValues) {
    return cy.get('@pMultiSelect');
  }

  const overlaySelector = '.p-multiselect-panel, .p-multiselect-overlay';
  const optionSelector = '.p-multiselect-item, li[role="option"], p-multiselectitem';

  const openOverlay = () => {
    cy.get('@pMultiSelect').should('be.visible').click();
    cy.get(overlaySelector).should('be.visible');

    if (opts.expectedOptionCount !== undefined) {
      cy.get(overlaySelector).find(optionSelector).should('have.length', opts.expectedOptionCount);
    }
  };

  openOverlay();

  // clear existing values when requested
  if (opts.clearValues) {
    cy.get('@pMultiSelect').within(() => {
      cy.root().then(($root: any) => {
        const $icon = ($root as any).find('.p-multiselect-clear-icon');
        if (!$icon || $icon.length === 0) {
          throw new Error(
            'clearValues is true but no .p-multiselect-clear-icon is present. Make sure [showClear]="true" is configured.'
          );
        }
        cy.wrap($icon).click({force: true});
      });
    });

    // after clearing, if no new selection is requested, we are done
    if (!opts.selectValues || opts.selectValues.length === 0) {
      return cy.get('@pMultiSelect');
    }

    // ensure overlay is open again for subsequent selections (clear might close it)
    openOverlay();
  }

  const by = opts.selectBy ?? 'label';

  if (opts.selectValues && opts.selectValues.length > 0) {
    opts.selectValues.forEach((selectedValue: string) => {
      if (by === 'label') {
        cy.get(overlaySelector)
          .contains(optionSelector, selectedValue)
          .click({force: true});
      } else {
        const attrName = String(by);
        cy.get(overlaySelector)
          .find(optionSelector)
          .then(($options: any) => {
            const arr = Array.from(($options as any).toArray()) as HTMLElement[];
            const found = arr.find((el: HTMLElement) => {
              const attributeValue = el.getAttribute(attrName) ?? '';
              return attributeValue === selectedValue;
            });
            if (found) {
              cy.wrap(found).click({force: true});
            } else {
              cy.get(overlaySelector).find(`[${attrName}="${selectedValue}"]`).click({force: true});
            }
          });
      }
    });
  }

  if (opts.keepOpen !== true) {
    cy.get('body').click('topLeft');
    cy.get(overlaySelector).should('not.exist');
  }

  if (opts.selectValues && opts.selectValues.length > 0) {
    if (by === 'label') {
      cy.get('@pMultiSelect').within(() => {
        cy.get('.p-multiselect-label, .p-multiselect-token').then(($labels: string) => {
          const text = ($labels as any).text();
          opts.selectValues?.forEach((v: string) => {
            if (!text.includes(v)) {
              throw new Error(`Expected p-multiselect to contain selected value "${v}"`);
            }
          });
        });
      });
    }
  }

  return cy.get('@pMultiSelect');
}

/**
 * Test helper for PrimeNG MultiSelect component (p-multiselect)
 * @param selector
 * @param options
 */
export function pMultiSelect(
  selector?: string | Chainable<any>,
  options: PMultiSelectOptions = {}
): Chainable<any> {
  const el = typeof selector === 'string' ? cy.get(selector) : selector ?? cy.get('p-multiselect');
  return pMultiSelectCore(el, options);
}
