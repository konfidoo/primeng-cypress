// Reference for custom commands moved to cypress/support/index.d.ts

// Replace placeholder test with component tests for PrimeNG p-button
import {Component} from '@angular/core'
import {ButtonModule} from 'primeng/button'

describe('pButton.cy.ts', () => {
  it('responds to click (click option)', () => {
    @Component({
      // include ButtonModule so the pButton directive/component is in scope for the template
      imports: [ButtonModule],
      template: `
        <p-button id="normalButton" [label]="label" (click)="count = count + 1"></p-button>
        <span class="count">{{ count }}</span>
      `
    })
    class TestHostComponent {
      label = 'Click me'
      count = 0
    }

    // cast cy to any to avoid TS errors if global augmentation for mount isn't picked up
    ;(cy as any).mount(TestHostComponent, {imports: [ButtonModule]})

    cy.get('#normalButton').pButton({click: true})
    cy.get('.count').should('contain.text', '1')
  })

  it('validates expected label (expectLabel option)', () => {
    @Component({
      imports: [ButtonModule],
      template: `
        <p-button id="labelled" [label]="label"></p-button>
      `
    })
    class TestHostComponent {
      label = 'Save'
    }

    ;(cy as any).mount(TestHostComponent, {imports: [ButtonModule]})

    cy.get('#labelled').pButton({expectLabel: 'Save'})
  })

  it('validates disabled state (disabled option)', () => {
    @Component({
      imports: [ButtonModule],
      template: `
        <p-button id="disabledButton" [label]="label" [disabled]="true"></p-button>
      `
    })
    class TestHostComponent {
      label = 'Nope'
    }

    ;(cy as any).mount(TestHostComponent, {imports: [ButtonModule]})

    // do not pass click: true here because the button is disabled
    cy.get('#disabledButton').pButton({disabled: true, expectLabel: 'Nope'})
  })

  it('checks host classes (expectClasses option)', () => {
    @Component({
      imports: [ButtonModule],
      template: `
        <p-button id="classed" class="primary special" label="Styled"></p-button>
      `
    })
    class TestHostComponent {
    }

    ;(cy as any).mount(TestHostComponent, {imports: [ButtonModule]})

    cy.get('#classed').pButton({expectClasses: ['primary', 'special']})
  })
})
