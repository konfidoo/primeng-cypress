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
 * Options for toggleInputField command
 */
export interface PToggleInputFieldOptions {
  /**
   * Value to input into the field
   */
  inputValue?: string;

  /**
   * Expected initial value of the readonly field
   */
  expectedValue?: string;
}
