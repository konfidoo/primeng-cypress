export interface GeneralElementOptions {
  expectClasses?: string[];
}


/**
 * Options for testing PrimeNG button component
 */
export interface NgButtonOptions extends GeneralElementOptions {
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
