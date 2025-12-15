// Reference for custom commands moved to cypress/support/index.d.ts

// Component tests for PrimeNG p-toggleswitch
import { Component } from '@angular/core'
import { ToggleSwitchModule } from 'primeng/toggleswitch'
import { FormsModule } from '@angular/forms'

describe('pToggleSwitch.cy.ts', () => {
  it('renders p-toggleswitch and responds to click', () => {
    @Component({
      // include ToggleSwitchModule and FormsModule for the toggleswitch component
      imports: [ToggleSwitchModule, FormsModule],
      template: `
        <p-toggleswitch id="mySwitch" [(ngModel)]="checked"></p-toggleswitch>
        <span class="status">{{checked}}</span>
      `
    })
    class TestHostComponent {
      checked = false
    }

    // mount the component
    ;(cy as any).mount(TestHostComponent, { imports: [ToggleSwitchModule, FormsModule] })

    // Test the toggleswitch using pToggleSwitch command
    // Initially unchecked, click should set it to checked
    cy.get('#mySwitch').pToggleSwitch({ setActive: true })
    
    // Verify the status text shows true
    cy.get('.status').should('have.text', 'true')
  })

  it('verifies active state before clicking', () => {
    @Component({
      imports: [ToggleSwitchModule, FormsModule],
      template: `
        <p-toggleswitch id="activeSwitch" [(ngModel)]="checked"></p-toggleswitch>
      `
    })
    class ActiveHostComponent {
      checked = true
    }

    ;(cy as any).mount(ActiveHostComponent, { imports: [ToggleSwitchModule, FormsModule] })

    // Test that the switch is initially active and remains active after click
    cy.get('#activeSwitch').pToggleSwitch({ isActive: true, setActive: true })
  })

  it('toggles from unchecked to checked', () => {
    @Component({
      imports: [ToggleSwitchModule, FormsModule],
      template: `
        <p-toggleswitch id="toggleSwitch" [(ngModel)]="checked"></p-toggleswitch>
      `
    })
    class ToggleHostComponent {
      checked = false
    }

    ;(cy as any).mount(ToggleHostComponent, { imports: [ToggleSwitchModule, FormsModule] })

    // Use pToggleSwitch with setActive option
    cy.get('#toggleSwitch').pToggleSwitch({ setActive: true })
  })
})
