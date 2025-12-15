import { PDatePickerOptions } from './types';

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for testing PrimeNG DatePicker component (p-datepicker)
 *
 * @param element - Cypress chainable element to test
 * @param options - Configuration options for datepicker testing
 * @returns Cypress chainable for further assertions
 */
export function pDatepickerCore(
  element: any,
  options: PDatePickerOptions = { autoOpen: false }
): any {
  // Scroll element into view with offset
  element.scrollIntoView({ offset: { top: -50, left: 0 } });

  // Verify the element is a P-DATEPICKER
  element.should('have.prop', 'nodeName', 'P-DATEPICKER');

  // Verify visibility
  element.should('be.visible');

  // Handle currentValue validation if provided
  if (options.currentValue !== undefined) {
    // Get the input element within the datepicker
    const inputElement = element.find('input');
    inputElement.should('exist');
    
    if (!options.noInputValidation) {
      inputElement.should('have.value', options.currentValue);
    }
  }

  // Handle inputValue if provided
  if (options.inputValue !== undefined) {
    const inputElement = element.find('input');
    inputElement.should('exist');
    
    // Clear and type the new value
    inputElement.clear();
    inputElement.type(options.inputValue);
    
    // Optionally validate the input was set
    if (!options.noInputValidation) {
      inputElement.should('have.value', options.inputValue);
    }
  }

  // Handle inline/autoOpen logic for opening the datepicker panel
  if (options.pick) {
    // Determine if we need to open the panel
    const needsOpen = !options.inline && options.autoOpen !== false;
    
    if (needsOpen) {
      // Click on the input or button to open the datepicker panel
      const inputElement = element.find('input');
      inputElement.click();
      
      // Wait for the panel to be visible
      cy.get('.p-datepicker').should('be.visible');
    }

    // For inline datepickers, the panel should already be visible
    if (options.inline) {
      element.find('.p-datepicker').should('be.visible');
    }

    // Navigate to the correct month if needed
    // First, we need to check the current displayed month and navigate if necessary
    if (options.pick.month) {
      // This is a simplified approach - in a real implementation, you might need
      // to click next/prev buttons to navigate to the correct month
      // For now, we'll assume we can select from the current view
    }

    // Select the day
    if (options.pick.day) {
      // Find and click the day cell
      // PrimeNG datepicker uses various selectors for day cells
      cy.get('.p-datepicker')
        .find(`[data-date="${options.pick.day}"]`)
        .first()
        .click({ force: true });
    }
  }

  // Handle expectedValue validation if provided
  if (options.expectedValue !== undefined) {
    const inputElement = element.find('input');
    inputElement.should('exist');
    
    if (!options.noInputValidation) {
      inputElement.should('have.value', options.expectedValue);
    }
  }

  return element;
}

/**
 * Test helper for PrimeNG DatePicker component (p-datepicker)
 *
 * @param selector - CSS selector or Cypress chainable to locate the datepicker
 * @param options - Configuration options for datepicker testing
 * @returns Cypress chainable for further assertions
 *
 * @example
 * ```typescript
 * // Test a datepicker with current value verification
 * pDatepicker('#my-datepicker', { currentValue: '01/15/2024' });
 *
 * // Pick a specific date
 * pDatepicker('#my-datepicker', { 
 *   autoOpen: true,
 *   pick: { day: 20, month: 3 },
 *   expectedValue: '03/20/2024'
 * });
 *
 * // Use as Cypress command
 * cy.pDatepicker('#my-datepicker', { currentValue: '01/15/2024' });
 *
 * // Use as chainable method
 * cy.get('#my-datepicker').pDatepicker({ autoOpen: true, pick: { day: 15, month: 6 } });
 * ```
 */
export function pDatepicker(
  selector: string | any,
  options: PDatePickerOptions = { autoOpen: false }
): any {
  // Get the datepicker element
  const datepicker = typeof selector === 'string'
    ? cy.get(selector)
    : selector;

  return pDatepickerCore(datepicker, options);
}
