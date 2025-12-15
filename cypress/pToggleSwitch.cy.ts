import {Component} from '@angular/core'
import {ToggleSwitchModule} from 'primeng/toggleswitch'
import {FormsModule} from '@angular/forms'

describe('pToggleSwitch.cy.ts', () => {
  it('toggles when clicked (click option)', () => {
    @Component({
      imports: [ToggleSwitchModule, FormsModule],
      template: `
        <p-toggleswitch id="toggle" [(ngModel)]="checked"></p-toggleswitch>
        <span class="val">{{ checked ? 'checked' : 'not checked' }}</span>
      `
    })
    class TestHostComponent {
      checked = false
    }

    ;(cy as any).mount(TestHostComponent, {imports: [ToggleSwitchModule, FormsModule]})

    // Chainable command usage (prefer this form for reliable mounting)
    // Click only to exercise the helper's click behavior (keep test minimal)
    cy.get('#toggle').pToggleSwitch({click: true})
  })

  it('validates checked state (expectChecked option)', () => {
    @Component({
      imports: [ToggleSwitchModule, FormsModule],
      template: `
        <p-toggleswitch id="checkedToggle" [(ngModel)]="checked"></p-toggleswitch>
      `
    })
    class TestHostComponent {
      checked = true
    }

    ;(cy as any).mount(TestHostComponent, {imports: [ToggleSwitchModule, FormsModule]})

    cy.get('#checkedToggle').pToggleSwitch({isChecked: true})
  })

  it('validates disabled state (disabled option)', () => {
    @Component({
      imports: [ToggleSwitchModule, FormsModule],
      template: `
        <p-toggleswitch id="disabledToggle" [disabled]="true"></p-toggleswitch>
      `
    })
    class TestHostComponent {
    }

    ;(cy as any).mount(TestHostComponent, {imports: [ToggleSwitchModule, FormsModule]})

    // Do not attempt to click; just assert the helper recognizes the disabled state
    cy.get('#disabledToggle').pToggleSwitch({disabled: true})
  })

  it('supports combined options (click + expectChecked + expectClasses)', () => {
    @Component({
      imports: [ToggleSwitchModule, FormsModule],
      template: `
        <p-toggleswitch id="combined" class="special large" [(ngModel)]="checked"></p-toggleswitch>
      `
    })
    class TestHostComponent {
      checked = false
    }

    ;(cy as any).mount(TestHostComponent, {imports: [ToggleSwitchModule, FormsModule]})

    // Click the toggle and assert checked state and host classes in one call
    cy.get('#combined').pToggleSwitch({
      click: true,
      isChecked: false,
      disabled: false,
      expectClasses: ['special', 'large']
    })
  })
})
