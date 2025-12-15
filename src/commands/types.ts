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
 * Options for testing PrimeNG ToggleSwitch component
 */
export interface PSwitchOptions {
  /**
   * Check if the switch is active before interaction
   */
  isActive?: boolean;

  /**
   * Whether to set the switch active (checked) after clicking
   * Default: true
   */
  setActive?: boolean;
}
