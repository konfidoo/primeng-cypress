/// <reference types="primeng-cypress/dist/cypress" />

/**
 * Example test file demonstrating Cypress command usage
 * 
 * This file shows how to use pButton as:
 * 1. cy.pButton() - Cypress command
 * 2. cy.get().pButton() - Chainable method
 * 
 * Prerequisites:
 * - Call registerPrimeNGCommands() in your cypress/support/e2e.ts file
 * - Add the reference directive above to get TypeScript support
 */

describe('PrimeNG Button Tests - Cypress Commands', () => {
  beforeEach(() => {
    // Visit your application page with PrimeNG buttons
    // cy.visit('/your-page-with-buttons');
  });

  describe('Using cy.pButton() command', () => {
    it('should verify button label', () => {
      cy.pButton('#submit-button', {
        expectLabel: 'Submit'
      });
    });

    it('should check if button is disabled', () => {
      cy.pButton('#disabled-button', {
        disabled: true,
        expectLabel: 'Disabled'
      });
    });

    it('should click button', () => {
      cy.pButton('#action-button', {
        expectLabel: 'Click Me',
        click: true
      });
      
      // Add assertions for the click action result
      // cy.get('.result').should('contain', 'Button clicked');
    });
  });

  describe('Using chainable .pButton() method', () => {
    it('should work with cy.get() chain', () => {
      cy.get('#submit-button').pButton({
        expectLabel: 'Submit'
      });
    });

    it('should work with find() chain', () => {
      cy.get('.form-container')
        .find('button.primary')
        .pButton({
          expectLabel: 'Save',
          disabled: false
        });
    });

    it('should click button in chain', () => {
      cy.get('#action-button')
        .pButton({
          expectLabel: 'Click Me',
          click: true
        });
      
      // Verify result
      // cy.get('.result').should('be.visible');
    });

    it('should work with complex selector chains', () => {
      cy.get('.modal')
        .should('be.visible')
        .find('.footer')
        .find('button[type="submit"]')
        .pButton({
          disabled: false,
          expectLabel: 'Confirm',
          click: true
        });
    });

    it('should chain additional Cypress commands after pButton', () => {
      cy.get('#my-button')
        .pButton({ expectLabel: 'Click Me' })
        .should('have.class', 'p-button-primary')
        .should('be.visible')
        .parent()
        .should('have.class', 'button-container');
    });
  });

  describe('Real-world form submission example', () => {
    it('should submit form with validation', () => {
      // Visit form page
      // cy.visit('/contact-form');
      
      // Initially submit button should be disabled
      cy.get('#submit-btn').pButton({
        disabled: true,
        expectLabel: 'Submit'
      });
      
      // Fill required fields
      // cy.get('#name').type('John Doe');
      // cy.get('#email').type('john@example.com');
      // cy.get('#message').type('Hello, this is a test message');
      
      // Now submit button should be enabled and we can click it
      cy.get('#submit-btn').pButton({
        disabled: false,
        expectLabel: 'Submit',
        click: true
      });
      
      // Verify success message
      // cy.get('.success-notification')
      //   .should('be.visible')
      //   .should('contain', 'Form submitted successfully');
    });
  });

  describe('Testing button state changes', () => {
    it('should test button before and after state change', () => {
      // Initial state - disabled
      cy.get('#conditional-btn').pButton({
        disabled: true,
        expectLabel: 'Save'
      });
      
      // Trigger some action that enables the button
      // cy.get('#enable-button').click();
      
      // New state - enabled
      cy.get('#conditional-btn').pButton({
        disabled: false,
        expectLabel: 'Save'
      });
    });
  });
});
