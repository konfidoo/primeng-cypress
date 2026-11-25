# pConfirmDialog

`pConfirmDialog` is a Cypress helper that validates a PrimeNG ConfirmDialog instance and can optionally close it by
clicking the accept or reject button. It helps assert title and message content and control dialog dismissal.

## Usage

Pass a selector for the rendered dialog when several dialogs are open. A custom `styleClass` on the PrimeNG component
provides a selector that also works when the dialog is appended to the document body.

```typescript
cy.pConfirmDialog('.my-confirm-root', {expectedTitle: 'Confirm', close: 'reject'});
```

You can also pass the rendered dialog as a Cypress subject.

```typescript
cy.get('.p-confirmdialog').pConfirmDialog({close: 'reject'});
```

## Options (PConfirmDialogOptions)

- `expectedTitle?: string` - If set, the helper asserts the dialog contains this title text.
- `expectedText?: string` - If set, the helper asserts the dialog contains this message/body text.
- `close?: 'accept' | 'reject'` - Clicks the corresponding button in the selected dialog and waits for that dialog to be removed.
