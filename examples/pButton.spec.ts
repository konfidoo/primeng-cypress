import { pButton } from '../src/pButton';

describe('PrimeNG Button Tests', () => {
  beforeEach(() => {
    // Visit your application page with PrimeNG buttons
    // cy.visit('/your-page-with-buttons');
  });

  it('should verify button label', () => {
    // Test button with expected label
    pButton('#submit-button', {
      expectLabel: 'Submit'
    });
  });

  it('should check if button is disabled', () => {
    // Test disabled button
    pButton('#disabled-button', {
      disabled: true,
      expectLabel: 'Disabled'
    });
  });

  it('should check if button is enabled', () => {
    // Test enabled button
    pButton('#enabled-button', {
      disabled: false,
      expectLabel: 'Enabled'
    });
  });

  it('should click button', () => {
    // Test button click
    pButton('#action-button', {
      expectLabel: 'Click Me',
      click: true
    });
    
    // Add assertions for the click action result
    // cy.get('.result').should('contain', 'Button clicked');
  });

  it('should verify and click button', () => {
    // Test button with multiple options
    pButton('.primary-button', {
      disabled: false,
      expectLabel: 'Save',
      click: true
    });
  });

  it('should work with cypress chainable', () => {
    // You can also pass a Cypress chainable
    const button = cy.get('.custom-button');
    pButton(button, {
      expectLabel: 'Custom',
      click: false
    });
  });
});
