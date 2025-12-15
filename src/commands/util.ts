import Chainable = Cypress.Chainable;

export function ensureClasses(element: Chainable<any>, expectClasses: string[]): void {
  for (const className of expectClasses) {
    element.should('have.class', className);
  }
}
