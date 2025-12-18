import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';

describe('pMultiSelect.cy.ts', () => {
  it('selects multiple values by label and validates currentValues', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi1"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
          [maxSelectedLabels]="3"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    cy.get('#multi1').pMultiSelect({
      selectValues: ['New York', 'London'],
      expectedOptionCount: 5,
    });

    cy.get('#multi1').pMultiSelect({
      currentValues: ['New York', 'London']
    });
  });

  it('selects multiple values by custom attribute (data-code)', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi2"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
          [maxSelectedLabels]="5"
        >
          <ng-template let-item #item>
            <div class="flex items-center gap-2" [attr.data-code]="item.code">
              {{ item.name }}
            </div>
          </ng-template>
        </p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    cy.get('#multi2').pMultiSelect({
      selectValues: ['NY', 'RM'],
      selectBy: 'data-code',
      expectedOptionCount: 5
    });
  });

  it('supports parent command form', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi3"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
          [maxSelectedLabels]="3"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    cy.pMultiSelect('#multi3', {
      selectValues: ['Rome', 'Paris'],
      selectBy: 'label'
    });

    cy.get('#multi3').pMultiSelect({
      currentValues: ['Rome', 'Paris']
    });
  });

  it('selects when appended to body', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi4"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
          appendTo="body"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    cy.get('#multi4').pMultiSelect({
      selectValues: ['New York', 'Paris'],
      expectedOptionCount: 5
    });

    cy.get('#multi4').pMultiSelect({
      currentValues: ['New York', 'Paris']
    });
  });

  it('validates when values are pre-selected', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi-pre1"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [
        {name: 'New York', code: 'NY'},
        {name: 'London', code: 'LDN'}
      ];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    cy.get('#multi-pre1').pMultiSelect({
      currentValues: ['New York', 'London']
    });
  });

  it('extends pre-selected values by selecting additional ones', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi-pre2"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [
        {name: 'New York', code: 'NY'}
      ];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    // First validate the initial pre-selected value
    cy.get('#multi-pre2').pMultiSelect({
      currentValues: ['New York']
    });

    // Then extend the selection using the helper
    cy.get('#multi-pre2').pMultiSelect({
      selectValues: ['London', 'Rome']
    });

    cy.get('#multi-pre2').pMultiSelect({
      currentValues: ['New York', 'London', 'Rome']
    });
  });

  it('clears existing values via clearValues before selecting new ones', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi-clear1"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
          [showClear]="true"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [
        {name: 'New York', code: 'NY'},
        {name: 'London', code: 'LDN'}
      ];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    // clear existing values, then select a new set
    cy.get('#multi-clear1').pMultiSelect({
      clearValues: true,
      selectValues: ['Rome', 'Paris']
    });

    cy.get('#multi-clear1').pMultiSelect({
      currentValues: ['Rome', 'Paris']
    });
  });

  it('respects keepOpen option and keeps overlay open after selection', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi-keep-open"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    cy.get('#multi-keep-open').pMultiSelect({
      selectValues: ['New York', 'London'],
      keepOpen: true,
      expectedOptionCount: 5
    });

    // overlay should still be visible when keepOpen is true
    cy.get('.p-multiselect-panel, .p-multiselect-overlay').should('be.visible');

    // selections should still be reflected on the host
    cy.get('#multi-keep-open').pMultiSelect({
      currentValues: ['New York', 'London']
    });
  });

  it('emits a clearValues error when no clear icon is configured', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi-clear2"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [
        {name: 'New York', code: 'NY'}
      ];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    let capturedError: any | null = null;

    // @ts-ignore
    cy.on('fail', (err: any) => {
      capturedError = err;
      // prevent Cypress from failing the test, we will assert on the error manually
      return false;
    });

    cy.get('#multi-clear2')
      .pMultiSelect({
        clearValues: true,
        selectValues: ['Rome']
      })
      .then(() => {
        if (!capturedError) {
          throw new Error('Expected clearValues to emit an error when no clear icon is configured');
        }

        if (
          !/clearValues is true but no \.p-multiselect-clear-icon is present\. Make sure \[showClear\]="true" is configured\./.test(
            capturedError.message
          )
        ) {
          throw capturedError;
        }
      });
  });

  it('respects isDisabled option and does not open overlay when disabled attribute is set', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi-disabled-attr"
          disabled
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    cy.get('#multi-disabled-attr').pMultiSelect({
      isDisabled: true
    });

    cy.get('.p-multiselect-panel, .p-multiselect-overlay').should('not.exist');
  });

  it('respects isDisabled option when .p-disabled class is present', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi-disabled-class"
          class="p-disabled"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ];

      selectedCities: { name: string; code: string }[] = [];
    }

    (cy as any).mount(TestHostComponent, {imports: [MultiSelectModule, FormsModule]});

    cy.get('#multi-disabled-class').pMultiSelect({
      isDisabled: true
    });

    cy.get('.p-multiselect-panel, .p-multiselect-overlay').should('not.exist');
  });

});
