// Ensure Cypress' Chainable is augmented at runtime for the component test bundler.
// This file is a TS module so webpack will include it when imported from the support file.

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      // pButton augmentation to be available after cy.get(...).pButton(...)
      pButton(options?: any): Chainable<any>;
    }
  }
}

export {};
