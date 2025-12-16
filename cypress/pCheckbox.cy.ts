/// <reference types="cypress" />

import {registerPrimeNGCommands} from '../src/commands/commands';
import {Component} from '@angular/core';
import {Checkbox, CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';

// Register commands for the test run
registerPrimeNGCommands();

describe('pCheckbox', () => {
  it('validates currentValue and selectValue', () => {
    @Component({
      template: `
        <div class="flex items-center">
          <p-checkbox id="checkbox1" inputId="checkbox1Input" [binary]="true" [(ngModel)]="checkboxValue"/>
          <label for="checkbox1Input" class="ml-2"> Checkbox 1 </label>
        </div>
        <div class="flex items-center">
          <p-checkbox id="checkbox2" inputId="checkbox2Input" [binary]="true" [(ngModel)]="checkboxValue"/>
          <label for="checkbox2Input" class="ml-2"> Checkbox 2 </label>
        </div>
      `,
      imports: [CheckboxModule, FormsModule],
    })
    class TestHostComponent {
      protected checkboxValue = false;
    }

    (cy as any).mount(TestHostComponent);

    cy.get('#checkbox1').pCheckbox({currentValue: false, selectValue: true});
    cy.get('#checkbox2').pCheckbox({currentValue: true, selectValue: false});
  });


  it('validates disabled state', () => {
    @Component({
      template: `
        <div class="flex items-center">
          <p-checkbox id="checkbox1" inputId="checkbox1Input" [binary]="true" [disabled]="true" [(ngModel)]="checkboxValue"/>
          <label for="checkbox1Input" class="ml-2"> Checkbox 1 </label>
        </div>
        <div class="flex items-center">
          <p-checkbox id="checkbox2" inputId="checkbox2Input" [binary]="true" [(ngModel)]="checkboxValue"/>
          <label for="checkbox2Input" class="ml-2"> Checkbox 2 </label>
        </div>
      `,
      imports: [CheckboxModule, FormsModule],
    })
    class TestHostComponent {
      protected checkboxValue = false;
    }

    (cy as any).mount(TestHostComponent);

    cy.get('#checkbox1').pCheckbox({disabled: true});
    cy.get('#checkbox2').pCheckbox({disabled: false});
  });

  it('validates toggle', () => {
    @Component({
      template: `
        <div class="flex items-center">
          <p-checkbox id="checkbox1" inputId="checkbox1Input" [binary]="true" [(ngModel)]="checkboxValue"/>
          <label for="checkbox1Input" class="ml-2"> Checkbox 1 </label>
        </div>
      `,
      imports: [CheckboxModule, FormsModule],
    })
    class TestHostComponent {
      protected checkboxValue = false;
    }

    (cy as any).mount(TestHostComponent);

    cy.get('#checkbox1').pCheckbox({currentValue: false, toggle: true});
    cy.get('#checkbox1').pCheckbox({currentValue: true, toggle: true});
    cy.get('#checkbox1').pCheckbox({currentValue: false});
  });

  it('validates selectValue wins against toggle', () => {
    @Component({
      template: `
        <div class="flex items-center">
          <p-checkbox id="checkbox1" inputId="checkbox1Input" [binary]="true" [(ngModel)]="checkboxValue"/>
          <label for="checkbox1Input" class="ml-2"> Checkbox 1 </label>
        </div>
      `,
      imports: [CheckboxModule, FormsModule],
    })
    class TestHostComponent {
      protected checkboxValue = false;
    }

    (cy as any).mount(TestHostComponent);

    cy.get('#checkbox1').pCheckbox({currentValue: false, toggle: true, selectValue: false});
    cy.get('#checkbox1').pCheckbox({currentValue: false});
  });
});
