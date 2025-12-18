export interface GeneralElementOptions {
  /**
   * When true, the helper will NOT scroll the element into view.
   * Default behaviour (undefined or false) is to perform a scroll to ensure
   * the element is visible for interactions in tests.
   */
  doNotScroll?: boolean;
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
export interface PConfirmDialogOptions extends GeneralElementOptions {
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
}

/**
 * Options for testing PrimeNG Panel component
 */
export interface PPanelOptions extends GeneralElementOptions {
  /**
   * Whether the panel is initially collapsed
   */
  isCollapsed?: boolean;

  /**
   * Whether the panel supports toggle behavior (has a toggle button)
   */
  isToggleable?: boolean;

  /**
   * Toggle the panel state when true
   */
  toggle?: boolean;

  /**
   * Expect the panel header title text
   */
  expectTitle?: string;

  /**
   * Forcefully set the panel state regardless of current state.
   * When provided, this takes precedence over `toggle`
   */
  setState?: 'expanded' | 'collapsed';
}

/**
 * Options for testing PrimeNG select component
 */
export interface PSelectOptions extends GeneralElementOptions {
  /**
   * Validates the currently selected value (label text)
   */
  currentValue?: string;

  /**
   * The value which should be selected. Interpreted according to `selectBy`.
   */
  selectValue?: string;

  /**
   * Determines how to select an option: use 'label' (the default) to match by visible label text,
   * or provide a custom attribute name (such as 'id' or 'data-optionId') to match against that
   * attribute on option elements. Any string other than 'label' is treated as a custom attribute name.
   */
  selectBy?: 'label' | string;

  /**
   * The expected count of options in the dropdown overlay
   */
  expectedOptionCount?: number;

  /**
   * A list of expected option labels (order-sensitive when provided)
   */
  expectedOptions?: string[];

  /**
   * When true, skip validating the selected value after clicking (useful if the dropdown
   * disappears or the host doesn't immediately update its label)
   */
  skipValidation?: boolean;

  /**
   * When true, assert the host is disabled and do not attempt to open the overlay or click options.
   */
  isDisabled?: boolean;
}

/**
 * Options for testing PrimeNG multi-select component
 */
export interface PMultiSelectOptions extends GeneralElementOptions {
  /**
   * Expected currently selected values (labels or attribute values depending on selectBy)
   */
  currentValues?: string[];

  /**
   * Values to select in the multiselect. Interpreted according to `selectBy`.
   */
  selectValues?: string[];

  /**
   * Expected number of options in the overlay panel
   */
  expectedOptionCount?: number;

  /**
   * Determines how to select options: use 'label' (the default) to match by visible label text,
   * or provide a custom attribute name (such as 'id' or 'data-optionId') to match against that
   * attribute on option elements. Any string other than 'label' is treated as a custom attribute name.
   */
  selectBy?: 'label' | string;

  /**
   * If true, the multi-select overlay will remain open after selecting values instead of being
   * closed by a blur-click on the body.
   */
  keepOpen?: boolean;

  /**
   * When true, the multi-select overlay will be closed by clicking outside (blur) after selections
   * are made. Default behaviour to close it by click on select element itself.
   */
  closeByBlur?: boolean;

  /**
   * When true, the helper will try to clear existing selections by clicking the clear icon
   * (requires the component to be configured with [showClear]="true").
   */
  clearValues?: boolean;

  /**
   * When true, assert the host is disabled and do not attempt to open the overlay or click options.
   */
  isDisabled?: boolean;
}
