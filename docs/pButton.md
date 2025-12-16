# pButton

The `pButton` helper simplifies asserting PrimeNG `<p-button>` instances. It can assert the rendered label and
optionally click the button via parent or chainable commands.

## Usage

Parent command (by selector):

```ts
cy.pButton('#submit-btn', {expectLabel: 'Submit', click: true})
```

Chainable usage after `cy.get()`:

```ts
cy.get('#submit-btn').pButton({expectLabel: 'Submit', click: true})
```

## Options

- `expectLabel`: the text to assert is rendered inside the button.
- `click`: when `true`, the helper clicks the button after validating the label.
- `disabled?: boolean` - asserts the button is disabled (prevents clicking when true).
