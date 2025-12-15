// Component tests for PrimeNG p-datepicker
import { Component } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

describe('pDatepicker.cy.ts', () => {
  it('renders p-datepicker and validates visibility', () => {
    @Component({
      imports: [DatePickerModule, FormsModule],
      template: `
        <p-datepicker id="basicDatepicker" [(ngModel)]="date"></p-datepicker>
      `
    })
    class TestHostComponent {
      date: Date | undefined;
    }

    (cy as any).mount(TestHostComponent, { imports: [DatePickerModule, FormsModule] });

    // Test basic visibility and element validation
    cy.get('#basicDatepicker').pDatepicker();
  });

  it('validates current value of datepicker', () => {
    @Component({
      imports: [DatePickerModule, FormsModule],
      template: `
        <p-datepicker id="valueDatepicker" [(ngModel)]="date" dateFormat="mm/dd/yy"></p-datepicker>
      `
    })
    class TestHostComponent {
      date: Date = new Date(2024, 0, 15); // January 15, 2024
    }

    (cy as any).mount(TestHostComponent, { imports: [DatePickerModule, FormsModule] });

    // Test current value validation
    cy.get('#valueDatepicker').pDatepicker({ currentValue: '01/15/24' });
  });

  it('sets input value in datepicker', () => {
    @Component({
      imports: [DatePickerModule, FormsModule],
      template: `
        <p-datepicker id="inputDatepicker" [(ngModel)]="date"></p-datepicker>
      `
    })
    class TestHostComponent {
      date: Date | undefined;
    }

    (cy as any).mount(TestHostComponent, { imports: [DatePickerModule, FormsModule] });

    // Test setting input value
    cy.get('#inputDatepicker').pDatepicker({ 
      inputValue: '03/20/2024',
      noInputValidation: false 
    });
  });

  it('works with inline datepicker', () => {
    @Component({
      imports: [DatePickerModule, FormsModule],
      template: `
        <p-datepicker id="inlineDatepicker" [(ngModel)]="date" [inline]="true"></p-datepicker>
      `
    })
    class TestHostComponent {
      date: Date | undefined;
    }

    (cy as any).mount(TestHostComponent, { imports: [DatePickerModule, FormsModule] });

    // Test inline datepicker (panel should be always visible)
    cy.get('#inlineDatepicker').pDatepicker({ inline: true });
  });

  it('opens datepicker with autoOpen and validates expected value', () => {
    @Component({
      imports: [DatePickerModule, FormsModule],
      template: `
        <p-datepicker id="autoOpenDatepicker" [(ngModel)]="date" dateFormat="mm/dd/yy"></p-datepicker>
      `
    })
    class TestHostComponent {
      date: Date | undefined;
    }

    (cy as any).mount(TestHostComponent, { imports: [DatePickerModule, FormsModule] });

    // Test autoOpen with expected value
    cy.get('#autoOpenDatepicker').pDatepicker({ 
      autoOpen: true,
      expectedValue: ''
    });
  });
});
