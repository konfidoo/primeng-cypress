// Reference for custom commands moved to cypress/support/index.d.ts

// Replace placeholder test with component tests for PrimeNG p-button
import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'

describe('pButton.cy.ts', () => {
  it('renders p-button and responds to click', () => {
    @Component({
      // include ButtonModule so the pButton directive/component is in scope for the template
      imports: [ButtonModule],
      template: `
        <p-button id="normalButton" [label]="label" (click)="count = count + 1"></p-button>
        <span class="count">{{count}}</span>
      `
    })
    class TestHostComponent {
      label = 'Click me'
      count = 0
    }

    // cast cy to any to avoid TS errors if global augmentation for mount isn't picked up
    ;(cy as any).mount(TestHostComponent, { imports: [ButtonModule] })


    cy.get('#normalButton').pButton({ expectLabel: 'Click me', click: true })
    // // button is rendered with the label
    // cy.get('button').should('exist').contains('Click me')
    //
    // // counter starts at 0 and increments when button is clicked
    // cy.get('.count').should('have.text', '0')
    // cy.get('button').click()
    // cy.get('.count').should('have.text', '1')
  })
  //
  // it('does not increment when disabled', () => {
  //   @Component({
  //     // ensure ButtonModule is available to the template
  //     imports: [ButtonModule],
  //     template: `
  //       <button pButton type="button" [label]="label" [disabled]="true" (click)="count = count + 1"></button>
  //       <span class="count">{{count}}</span>
  //     `
  //   })
  //   class DisabledHostComponent {
  //     label = 'Disabled'
  //     count = 0
  //   }
  //
  //   ;(cy as any).mount(DisabledHostComponent, { imports: [ButtonModule] })
  //
  //   // button has disabled attribute and click should not change the counter
  //   cy.get('button').should('be.disabled')
  //   cy.get('.count').should('have.text', '0')
  //
  //   // attempt native click via DOM (disabled buttons should not dispatch click)
  //   cy.get('button').then(($btn) => {
  //     // native click on a disabled button is a no-op in browsers
  //     $btn[0].click()
  //   })
  //
  //   cy.get('.count').should('have.text', '0')
  // })
})
