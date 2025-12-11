# Usage Examples for pButton

This document provides detailed examples of how to use the `pButton` test helper.

## Setup

First, import the function in your Cypress test file:

```typescript
import { pButton } from 'primeng-cypress';
```

## Basic Examples

### 1. Simple Button Label Check

Test that a button has the expected label:

```typescript
it('should have correct label', () => {
  pButton('#submit-button', { 
    expectLabel: 'Submit' 
  });
});
```

### 2. Check Disabled State

Verify that a button is disabled:

```typescript
it('should be disabled', () => {
  pButton('#disabled-button', { 
    disabled: true 
  });
});
```

### 3. Check Enabled State

Verify that a button is enabled (not disabled):

```typescript
it('should be enabled', () => {
  pButton('#enabled-button', { 
    disabled: false 
  });
});
```

### 4. Click a Button

Click a button and verify the action:

```typescript
it('should click button', () => {
  pButton('#action-button', { 
    click: true 
  });
  
  // Add your assertions here
  cy.get('.success-message').should('be.visible');
});
```

## Advanced Examples

### Combined Options

Use multiple options together:

```typescript
it('should verify and click enabled button', () => {
  pButton('#save-button', {
    disabled: false,
    expectLabel: 'Save Changes',
    click: true
  });
});
```

### Using with Cypress Chainable

You can pass a Cypress chainable instead of a selector:

```typescript
it('should work with chainable', () => {
  const button = cy.get('.container').find('button.primary');
  
  pButton(button, {
    expectLabel: 'Primary Action',
    click: true
  });
});
```

### Form Submission Flow

Test a complete form submission:

```typescript
it('should submit form', () => {
  // Fill form fields
  cy.get('#name-input').type('John Doe');
  cy.get('#email-input').type('john@example.com');
  
  // Test submit button
  pButton('#submit-form-btn', {
    disabled: false,
    expectLabel: 'Submit Form',
    click: true
  });
  
  // Verify submission
  cy.get('.form-success').should('contain', 'Form submitted successfully');
});
```

### Testing Button States

Test button state changes:

```typescript
it('should enable button after validation', () => {
  // Initially disabled
  pButton('#submit-btn', { disabled: true });
  
  // Fill required field
  cy.get('#required-field').type('value');
  
  // Now enabled
  pButton('#submit-btn', { 
    disabled: false,
    expectLabel: 'Submit'
  });
});
```

## Error Handling

The function will automatically handle common scenarios:

- If `click: true` is set, it ensures the button is not disabled before clicking
- If the element doesn't exist, the test will fail with a clear error message
- Label verification uses `contain.text` so partial matches work

## Chaining

Since `pButton` returns a Cypress chainable, you can chain additional Cypress commands:

```typescript
pButton('#my-button', { expectLabel: 'Click Me' })
  .should('have.class', 'p-button-primary')
  .should('be.visible');
```
