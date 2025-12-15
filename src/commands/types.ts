/**
 * Options for testing PrimeNG button component
 */
export interface NgButtonOptions {
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Whether to click the button
   */
  click?: boolean;

  /**
   * Expected label text of the button
   */
  expectLabel?: string;
}

/**
 * Options for testing PrimeNG DatePicker component
 */
export interface PDatePickerOptions {
  /**
   * Current value of the datepicker (for validation)
   */
  currentValue?: string;

  /**
   * Input value to set in the datepicker
   */
  inputValue?: string;

  /**
   * Skip input validation if true
   */
  noInputValidation?: boolean;

  /**
   * Date selection configuration
   */
  pick?: {
    /**
     * Day of the month to pick (1-31)
     */
    day: number;
    /**
     * Month to pick (1-12)
     */
    month: number;
  };

  /**
   * Whether the datepicker is inline (always visible)
   */
  inline?: boolean;

  /**
   * Whether to automatically open the datepicker panel
   */
  autoOpen?: boolean;

  /**
   * Expected value after operations are performed
   */
  expectedValue?: string;
}
