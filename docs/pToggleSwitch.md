# pToggleSwitch

A helper for testing PrimeNG `p-toggleswitch` / `p-togglebutton` components in Cypress component tests.

This helper supports both parent and chainable forms and attempts to detect common PrimeNG render patterns
(`input[type="checkbox"]`, a clickable `button` with `aria-pressed`, or a host class like `p-toggleswitch-checked`).

## Usage

Parent command (selector):

```ts
cy.pToggleSwitch('#my-toggle', {expectChecked: true, click: true})
```

Chainable usage after `cy.get()`:

```ts
cy.get('#my-toggle').pToggleSwitch({expectChecked: false})
```

## Options

- `expectChecked?: boolean` — assert whether the toggle is checked. The helper will inspect inputs, aria attributes or
  host classes.
- `click?: boolean` — perform a click on the primary clickable target (button > input > host) to toggle state.
- `disabled?: boolean` — assert the disabled state (checks input/button disabled or `p-disabled` host class).
- `expectClasses?: string[]` — assert host classes are present.

## Examples

- Click and verify checked state + host classes:

```ts
cy.get('#my-toggle').pToggleSwitch({click: true, expectChecked: true, expectClasses: ['special']})
```

- Verify disabled state without clicking:

```ts
cy.pToggleSwitch('#disabled', {disabled: true})
```
