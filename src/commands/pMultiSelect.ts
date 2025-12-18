/// <reference types="cypress" />
import {PMultiSelectOptions} from './types';
import {ensureClasses} from './util';

declare var cy: any;

const overlaySelector = '.p-multiselect-overlay';
const optionSelector = '.p-multiselect-item, li[role="option"], p-multiselectitem';

// Helper to ensure the overlay for the current p-multiselect host is open and visible
const openOverlay = (
  alias: string = '@pMultiSelect',
  maxTries = 3
): Cypress.Chainable<JQuery<HTMLElement>> => {
  let attempts = 0;

  const tryOpen = (): void => {
    attempts += 1;

    cy.get(alias).should('be.visible').click();

    cy.get('body').then(($body: JQuery<HTMLElement>) => {
      const overlay = $body.find(overlaySelector).filter(':visible');
      if (overlay.length > 0) {
        // Overlay is visible; nothing more to schedule here
        return;
      }

      if (attempts < maxTries) {
        // Schedule another attempt; Cypress will queue this call
        tryOpen();
      } else {
        throw new Error('Failed to open p-multiselect overlay after maximum number of tries');
      }
    });
  };

  tryOpen();

  // Return the currently visible overlay to allow further chaining
  return cy.get(overlaySelector).filter(':visible') as Cypress.Chainable<JQuery<HTMLElement>>;
};

// Helper to close the overlay for the current p-multiselect host if it is open
const closeOverlay = (
  alias: string = '@pMultiSelect',
  closeByBlur = false
): Cypress.Chainable<JQuery<HTMLElement>> => {
  // Use cy.wrap to stay inside the Cypress chain and always return a chainable
  return cy.wrap(null).then(() => {
    cy.get('body').then(($body: JQuery<HTMLElement>) => {
      const overlay$ = $body.find(overlaySelector).filter(':visible');
      if (overlay$.length && overlay$.is(':visible')) {
        if (closeByBlur) {
          // Close by clicking on the body, outside of the overlay
          cy.get('body').click('topLeft');
        } else {
          // Close by clicking the host element again
          cy.get(alias).click();
        }
      }
    });
  }) as Cypress.Chainable<JQuery<HTMLElement>>;
};

/**
 * Core logic for testing PrimeNG MultiSelect component (p-multiselect)
 *
 * This helper wraps a p-multiselect host element and provides a higher-level API to
 * validate state (current values, disabled state, classes) and interact with the
 * overlay (open, clear, select values) in a robust way.
 *
 * All behavior in this function is relied upon by Cypress tests and should not be
 * changed without updating the tests.
 *
 * @param element Host element chainable (usually cy.get('p-multiselect') or a specific selector)
 * @param options Behavior and assertion options
 */
export function pMultiSelectCore(
  element: Cypress.Chainable<any>,
  options: PMultiSelectOptions = {}
): Cypress.Chainable<any> {
  element.as('pMultiSelect');

  const resolvedOptions: PMultiSelectOptions = {
    selectBy: 'label',
    closeByBlur: false,
    ...options,
  };

  const opts = resolvedOptions;

  // Scroll into view by default so interactions are reliable
  if (!opts?.doNotScroll) {
    cy.get('@pMultiSelect').scrollIntoView();
  }

  // Basic sanity checks to ensure we are dealing with a p-multiselect host
  cy.get('@pMultiSelect').should('exist');
  cy.get('@pMultiSelect')
    .should('have.prop', 'nodeName')
    .and('match', /^P-MULTISELECT$/);

  // Ensure overlay is closed before we start any new interaction sequence
  closeOverlay('@pMultiSelect', opts.closeByBlur);

  if (opts.expectClasses !== undefined) {
    ensureClasses(cy.get('@pMultiSelect'), opts.expectClasses);
  }

  // When isDisabled is provided, assert disabled state and do not interact further
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

    // Optionally validate current values when disabled
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

    // No further interactions when disabled; just return the host
    return cy.get('@pMultiSelect');
  }

  // Validate current values when provided (non-disabled cases)
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

  // If no new selection, no clear requested and no expected option count, we can return early
  if (
    (!opts.selectValues || opts.selectValues.length === 0) &&
    !opts.clearValues &&
    opts.expectedOptionCount === undefined
  ) {
    return cy.get('@pMultiSelect');
  }

  // When we need to inspect or interact with the overlay, open it once up front
  if (
    opts.clearValues ||
    (opts.selectValues && opts.selectValues.length > 0) ||
    opts.expectedOptionCount !== undefined
  ) {
    openOverlay('@pMultiSelect');
  }

  // Expected option count inside the overlay
  if (opts.expectedOptionCount !== undefined) {
    cy.get(overlaySelector)
      .find(optionSelector)
      .should('have.length', opts.expectedOptionCount);
  }

  // Clear existing values when requested
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

    // After clearing, if no new selection is requested, we are done
    if (!opts.selectValues || opts.selectValues.length === 0) {
      if (opts.keepOpen !== true) {
        cy.get('body').click('topLeft');
        cy.get(overlaySelector).should('not.exist');
      }
      return cy.get('@pMultiSelect');
    }

    // Ensure overlay is open again for subsequent selections (clear might close it)
    openOverlay('@pMultiSelect');
  }

  const by = opts.selectBy ?? 'label';

  if (opts.selectValues && opts.selectValues.length > 0) {
    if (by === 'label') {
      // Select by visible label text
      opts.selectValues.forEach((value: string) => {
        cy.get(overlaySelector)
          .contains(optionSelector, value)
          .click({force: true});
      });
    } else {
      // Treat `by` as an attribute name, for example 'data-code'
      const attrName = String(by);
      opts.selectValues.forEach((value: string) => {
        cy.get(overlaySelector)
          .find(optionSelector)
          .then(($options: any) => {
            const arr = Array.from($options.toArray()) as HTMLElement[];
            const found = arr.find((el: HTMLElement) => {
              const attr = el.getAttribute(attrName) ?? '';
              return attr === value;
            });
            if (found) {
              cy.wrap(found).click({force: true});
            } else {
              cy.get(overlaySelector).find(`[${attrName}="${value}"]`).click({force: true});
            }
          });
      });
    }
  }

  if (opts.keepOpen !== true) {
    // Close overlay again when we are done interacting, unless keepOpen is requested
    closeOverlay('@pMultiSelect', opts.closeByBlur);
    cy.get(overlaySelector).should('not.exist');
  }

  // Note: We intentionally do not re-validate selected values here; callers can
  // assert on currentValues in a separate step if needed.

  return cy.get('@pMultiSelect');
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
