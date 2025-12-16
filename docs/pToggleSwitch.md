# pToggleSwitch

A helper for testing PrimeNG `p-toggleswitch` components in Cypress component tests.

This helper supports both parent and chainable forms and attempts to detect common PrimeNG render patterns
(`input[type="checkbox"]`, a clickable `button` with `aria-pressed`, or a host class like `p-toggleswitch-checked`).

## Usage

Parent command (selector):

```ts
cy.pToggleSwitch('#my-toggle', {currentValue: true, toggle: true})
```

Chainable usage after `cy.get()`:

```ts
cy.get('#my-toggle').pToggleSwitch({currentValue: false})
```

## Options

- `currentValue?: boolean` — Assert whether the toggle is currently checked (`true`) or not (`false`). The helper
  inspects inputs, aria attributes or host classes.
- `selectValue?: boolean` — If provided, the helper will attempt to change the toggle to this explicit boolean by
  clicking only when necessary. This option is precise and takes precedence over `toggle` when both are provided.
- `toggle?: boolean` — If `true`, the helper will click to flip (invert) the current state. Use this when you want a
  plain toggle action rather than setting a specific target value. `selectValue` wins if both are present.
- `disabled?: boolean` — Assert the disabled state (checks input/button disabled or `p-disabled` host class).
- `expectClasses?: string[]` — Assert that host classes are present.

## Examples

- Click to flip state and verify host classes:

```ts
cy.get('#my-toggle').pToggleSwitch({toggle: true, currentValue: false, expectClasses: ['special']})
```

- Set a specific value (idempotent):

```ts
cy.get('#my-toggle').pToggleSwitch({selectValue: true})
cy.get('#my-toggle').pToggleSwitch({selectValue: false})
```

- Verify disabled state without clicking:

```ts
cy.pToggleSwitch('#disabled', {disabled: true})
```
