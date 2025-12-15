# pToggleSwitch Command Documentation

## Overview

The `pToggleSwitch` command is a Cypress test helper for PrimeNG's ToggleSwitch component (`p-toggleswitch`). It provides a convenient way to test toggle switches by verifying element properties, checking active states, and ensuring proper click behavior.

## How It Works

### Element Verification

The command first verifies that the element is a valid PrimeNG ToggleSwitch component by:

1. Checking the element's `nodeName` property
2. Matching it against the regular expression `/^P-TOGGLE-?SWITCH$/`
   - This matches both `P-TOGGLESWITCH` and `P-TOGGLE-SWITCH` variations

```typescript
cy.wrap(subject)
  .should('have.prop', 'nodeName')
  .and('match', /^P-TOGGLE-?SWITCH$/);
```

### isActive Evaluation

Before clicking the element, the command can optionally verify if the switch is in an active (checked) state:

- When `options.isActive === true`, the command checks for the presence of the `p-toggleswitch-checked` CSS class
- This ensures the switch is in the expected state before interaction

```typescript
if (options.isActive === true) {
  cy.wrap(subject).should('have.class', 'p-toggleswitch-checked');
}
```

### Click Behavior

The command performs a click action on the toggle switch element:

```typescript
cy.wrap(subject).click();
```

### setActive Evaluation

After clicking, the command can verify the resulting state:

- When `options.setActive` is `true` (default), the command verifies that the switch has the `p-toggleswitch-checked` class
- This ensures the switch is in the active/checked state after the click
- If `setActive` is `false` or `undefined`, this verification is skipped

```typescript
if (options.setActive) {
  cy.wrap(subject).should('have.class', 'p-toggleswitch-checked');
}
```

## Options Interface

```typescript
interface PSwitchOptions {
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
```

## Usage Examples

### Basic Usage - Set switch to active

```typescript
cy.pToggleSwitch('#my-switch', { setActive: true });
```

### Verify switch is initially active, then toggle it

```typescript
cy.pToggleSwitch('#active-switch', { isActive: true, setActive: true });
```

### Chainable Usage

```typescript
cy.get('#my-switch').pToggleSwitch({ setActive: true });
```

### Use as standalone function

```typescript
import { pToggleSwitch } from 'primeng-cypress';

pToggleSwitch('#my-switch', { isActive: false, setActive: true });
```

## Implementation Details

The command implementation follows these steps:

1. **Element Validation**: Ensures the target is a P-TOGGLESWITCH element
2. **Pre-Click State Check** (optional): Verifies the switch's active state if `isActive` is specified
3. **Click Action**: Performs the click on the element
4. **Post-Click State Check** (default): Verifies the switch is checked after clicking if `setActive` is true

This sequence ensures reliable testing of toggle switch behavior in PrimeNG applications.
