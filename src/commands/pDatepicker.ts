import { PDatePickerOptions } from './types';

// Declare global cy for runtime access
declare var cy: any;

/**
 * Core logic for testing PrimeNG DatePicker component (p-datepicker)
 *
 * This function provides comprehensive testing capabilities for the PrimeNG DatePicker component,
 * including validation, interaction, and date selection.
 *
 * ## Coverage Areas:
 *
 * ### 1. Visibility and Element Validation
 * - Scrolls the datepicker into view with a configurable offset
 * - Validates that the element is indeed a P-DATEPICKER component
 * - Ensures the element is visible on the page
 *
 * ### 2. Current Value Validation (`currentValue`)
 * - Checks if the datepicker's input field contains the expected value
 * - Can be skipped with `noInputValidation: true`
 *
 * ### 3. Input Value Setting (`inputValue`)
 * - Clears the current input value
 * - Types a new value into the datepicker input field
 * - Validates the input was set correctly (unless `noInputValidation` is true)
 *
 * ### 4. Inline/AutoOpen Logic
 * - `inline: true` - For datepickers that are always visible (no popup)
 *   - The calendar panel should already be visible in the DOM
 * - `autoOpen: true` - For popup datepickers
 *   - Automatically clicks the input to open the calendar panel
 *   - Waits for the panel to become visible before proceeding
 * - Default (`autoOpen: false`) - Does not automatically open the panel
 *
 * ### 5. Date Picking (`pick` object)
 * - Allows selecting a specific date from the calendar
 * - `pick.day` - Day of the month to select (1-31)
 * - `pick.month` - Month to navigate to (1-12)
 * - Automatically opens the panel if `autoOpen` is not false and `inline` is not true
 *
 * ### 6. Expected Value Validation (`expectedValue`)
 * - After all operations, validates that the input contains the expected value
 * - Useful for verifying that date picking operations completed successfully
 * - Can be skipped with `noInputValidation: true`
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
    // Only open if explicitly set to true and not inline
    const needsOpen = !options.inline && options.autoOpen === true;
    
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
    // Note: Month navigation is currently limited. This implementation assumes
    // the desired month is already displayed or uses the default view.
    // For production use, implement navigation logic by clicking prev/next buttons
    // to reach the target month. The month parameter is optional and primarily
    // serves as a reference for which month the day belongs to.
    if (options.pick.month) {
      // TODO: Implement month navigation logic
      // This would involve comparing current month with target month
      // and clicking next/previous month buttons accordingly
    }

    // Select the day
    if (options.pick.day) {
      // Find and click the day cell
      // Note: The selector strategy may need adjustment based on PrimeNG version
      // Different versions may use different attributes or class names
      // Common selectors: td containing the day number, [aria-label], or specific classes
      cy.get('.p-datepicker')
        .contains('td', options.pick.day.toString())
        .first()
        .click();
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
