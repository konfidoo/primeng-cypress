# pConfirmDialog

`pConfirmDialog` is a Cypress helper that validates a PrimeNG ConfirmDialog instance and can optionally close it by
clicking the accept or reject button. It helps assert title and message content and control dialog dismissal.

## Usage

Parent (selector + options):

```typescript
cy.pConfirmDialog('.my-confirm-root', {expectedTitle: 'Confirm', close: 'reject'});
```

Chainable:

```typescript
cy.get('.p-confirmdialog').pConfirmDialog({close: 'reject'});
```

## Options (NgConfirmDialogOptions)

- `expectedTitle?: string` - If set, the helper asserts the dialog contains this title text.
- `expectedText?: string` - If set, the helper asserts the dialog contains this message/body text.
- `close?: 'accept' | 'reject'` - If set to `'accept'` the helper clicks the accept button; if set to `'reject'` it
  clicks the reject button. After clicking the helper asserts the dialog no longer exists.
