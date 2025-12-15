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

/**
 * Options for testing PrimeNG tabs component
 */
export interface PTabsOptions {

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
