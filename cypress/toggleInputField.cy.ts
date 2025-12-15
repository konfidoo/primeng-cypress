// Test for toggleInputField custom command

import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'

describe('toggleInputField.cy.ts', () => {
  it('toggles input field edit mode and updates value', () => {
    @Component({
      imports: [ButtonModule, FormsModule],
      template: `
        <div id="testContainer">
          <input 
            *ngIf="!isEditing" 
            type="text" 
            [value]="value" 
            readonly 
            data-test="value-field-readonly"
          />
          <input 
            *ngIf="isEditing" 
            type="text" 
            [(ngModel)]="editValue" 
            data-test="value-field"
          />
          <p-button 
            *ngIf="!isEditing"
            [label]="'Edit'" 
            (click)="startEdit()"
            data-test="btn-edit-values"
          ></p-button>
          <p-button 
            *ngIf="isEditing"
            [label]="'Accept'" 
            (click)="acceptChanges()"
            data-test="btn-accept-changes"
          ></p-button>
        </div>
      `
    })
    class TestInputFieldComponent {
      value = 'Initial Value'
      editValue = ''
      isEditing = false

      startEdit() {
        this.isEditing = true
        this.editValue = this.value
      }

      acceptChanges() {
        this.value = this.editValue
        this.isEditing = false
      }
    }

    // Mount the component
    ;(cy as any).mount(TestInputFieldComponent, { imports: [ButtonModule, FormsModule] })

    // Test the toggleInputField command
    cy.get('#testContainer').toggleInputField({
      expectedValue: 'Initial Value',
      inputValue: 'New Value'
    })

    // Verify the readonly field now shows the new value
    cy.get('input[readonly]').should('have.value', 'New Value')
  })

  it('works with minimal options - no expectedValue check', () => {
    @Component({
      imports: [ButtonModule, FormsModule],
      template: `
        <div id="minimalContainer">
          <input 
            *ngIf="!isEditing" 
            type="text" 
            [value]="value" 
            readonly 
            data-test="value-field-readonly"
          />
          <input 
            *ngIf="isEditing" 
            type="text" 
            [(ngModel)]="editValue" 
            data-test="value-field"
          />
          <p-button 
            *ngIf="!isEditing"
            [label]="'Edit'" 
            (click)="startEdit()"
            data-test="btn-edit-values"
          ></p-button>
          <p-button 
            *ngIf="isEditing"
            [label]="'Accept'" 
            (click)="acceptChanges()"
            data-test="btn-accept-changes"
          ></p-button>
        </div>
      `
    })
    class MinimalTestComponent {
      value = 'Original'
      editValue = ''
      isEditing = false

      startEdit() {
        this.isEditing = true
        this.editValue = this.value
      }

      acceptChanges() {
        this.value = this.editValue
        this.isEditing = false
      }
    }

    // Mount the component
    ;(cy as any).mount(MinimalTestComponent, { imports: [ButtonModule, FormsModule] })

    // Test with only inputValue
    cy.get('#minimalContainer').toggleInputField({
      inputValue: 'Updated Value'
    })

    // Verify the readonly field shows the updated value
    cy.get('input[readonly]').should('have.value', 'Updated Value')
  })
})
