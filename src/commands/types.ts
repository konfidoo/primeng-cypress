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
  currentValue?: boolean;

  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;

  /**
   * If provided, will attempt to change the toggle value to this boolean by clicking.
   * This option is more precise and takes precedence over `toggle` when both are provided.
   */
  selectValue?: boolean;

  /**
   * Whether to perform a click on the toggle to change its state
   * combine with isChecked to ensure the state changes appropriately
   * example if isChecked is true and click is true, after the click the toggle should be unchecked
   */
  toggle?: boolean;
}

/**
 * Options for testing PrimeNG Checkbox component
 */
export interface PCheckboxOptions extends GeneralElementOptions {
  /**
   * Whether the underlying input is disabled
   */
  disabled?: boolean;

  /**
   * Expected current checked state (true/false)
   */
  currentValue?: boolean;

  /**
   * If provided, will attempt to change the checkbox value to this boolean by clicking
   * This option is more precise and takes precedence over `toggle` when both are provided.
   */
  selectValue?: boolean;

  /**
   * If true, will toggle (click) the checkbox to flip its current state.
   * Note: when both `selectValue` and `toggle` are provided, `selectValue` is leading and will be used.
   */
  toggle?: boolean;
}

/**
 * Options for testing PrimeNG ConfirmDialog component
 */
export type PConfirmDialogOptions = {
  /**
   * Expected title text to assert
   */
  expectedTitle?: string;

  /**
   * Expected message/body text to assert
   */
  expectedText?: string;

  /**
   * If 'accept', click the accept button; if 'reject', click the reject button; otherwise undefined
   */
  close?: 'accept' | 'reject';
};
