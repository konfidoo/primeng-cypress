export interface GeneralElementOptions {
  expectClasses?: string[];
}


/**
 * Options for testing PrimeNG button component
 */
export interface PButtonOptions extends GeneralElementOptions {
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
 * Options for testing PrimeNG tabs component
 */
export interface PTabsOptions extends GeneralElementOptions {

  /**
   * Label of the currently active tab to validate
   */
  activeTab?: string;

  /**
   * Label of the tab to select and validate
   */
  select?: string;

  /**
   * Expected number of tabs
   */
  expectedTabCount?: number;
}

/**
 * Options for testing PrimeNG ToggleSwitch component
 */
export interface PToggleSwitchOptions extends GeneralElementOptions {
  /**
   * Expected initial checked state of the toggle switch
   */
  isChecked?: boolean;

  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;

  /**
   * Whether to perform a click on the toggle to change its state
   * combine with isChecked to ensure the state changes appropriately
   * example if isChecked is true and click is true, after the click the toggle should be unchecked
   */
  click?: boolean;
}
