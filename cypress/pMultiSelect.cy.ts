import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';

// Reusable type and data for all MultiSelect tests
interface City {
  name: string;
  code: string;
}

const BASE_CITIES: City[] = [
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
];

// Helper to mount a host component with the common MultiSelect imports
const mountWithMultiSelectImports = (component: any) =>
  (cy as any).mount(component, {imports: [MultiSelectModule, FormsModule]});

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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [];
    }

    mountWithMultiSelectImports(TestHostComponent);

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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [];
    }

    mountWithMultiSelectImports(TestHostComponent);

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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [];
    }

    mountWithMultiSelectImports(TestHostComponent);

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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [];
    }

    mountWithMultiSelectImports(TestHostComponent);

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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [
        {name: 'New York', code: 'NY'},
        {name: 'London', code: 'LDN'}
      ];
    }

    mountWithMultiSelectImports(TestHostComponent);

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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [
        {name: 'New York', code: 'NY'}
      ];
    }

    mountWithMultiSelectImports(TestHostComponent);

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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [
        {name: 'New York', code: 'NY'},
        {name: 'London', code: 'LDN'}
      ];
    }

    mountWithMultiSelectImports(TestHostComponent);

    // Clear existing values first, then select a new set
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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [];
    }

    mountWithMultiSelectImports(TestHostComponent);

    cy.get('#multi-keep-open').pMultiSelect({
      selectValues: ['New York', 'London'],
      keepOpen: true,
      expectedOptionCount: 5
    });

    // Overlay should still be visible when keepOpen is true
    cy.get('.p-multiselect-panel, .p-multiselect-overlay').should('be.visible');

    // Selections should still be reflected on the host
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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [
        {name: 'New York', code: 'NY'}
      ];
    }

    mountWithMultiSelectImports(TestHostComponent);

    let capturedError: any | null = null;

    // Capture Cypress fail event so we can assert on the error manually
    // @ts-ignore
    cy.on('fail', (err: any) => {
      capturedError = err;
      // Prevent Cypress from failing the test immediately; we will assert on the error later
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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [];
    }

    mountWithMultiSelectImports(TestHostComponent);

    cy.get('#multi-disabled-attr').pMultiSelect({
      isDisabled: true
    });

    // When disabled, the overlay should never open
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
      cities: City[] = [...BASE_CITIES];

      selectedCities: City[] = [];
    }

    mountWithMultiSelectImports(TestHostComponent);

    cy.get('#multi-disabled-class').pMultiSelect({
      isDisabled: true
    });

    // When disabled via class, the overlay should never open
    cy.get('.p-multiselect-panel, .p-multiselect-overlay').should('not.exist');
  });

  it('handles asynchronous re-render of the host component (framework re-rendered asynchronously)', () => {
    @Component({
      imports: [MultiSelectModule, FormsModule],
      standalone: true,
      template: `
        <p-multiselect
          id="multi-async"
          [options]="cities"
          [(ngModel)]="selectedCities"
          optionLabel="name"
          placeholder="Select Cities"
        ></p-multiselect>
      `
    })
    class TestHostComponent {
      // Start with a limited set of options and no selection
      protected cities: City[] = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'}
      ];

      protected selectedCities: City[] = [];

      // Simulate an async re-render where options and selection change over time
      ngOnInit() {
        // Pre-select Rome immediately
        this.selectedCities = [{name: 'Rome', code: 'RM'}];

        // Later, asynchronously extend the options list to more cities
        setTimeout(() => {
          this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Paris', code: 'PRS'},
            {name: 'Berlin', code: 'BER'}
          ];
        }, 100);
      }
    }

    mountWithMultiSelectImports(TestHostComponent);

    // First assert on the initial selection and select an additional value before the async re-render
    // expectedOptionCount is 2 here because only two options are available initially
    cy.get('#multi-async').pMultiSelect({
      currentValues: ['Rome'],
      selectValues: ['Paris'],
      expectedOptionCount: 2,
      keepOpen: true,
    });

    // Wait for the async re-render to complete and update the available options
    cy.wait(150);

    // After re-render there are 5 options; validate current selection and extend it further
    cy.get('#multi-async').pMultiSelect({
      currentValues: ['Rome', 'Paris'],
      selectValues: ['London'],
      expectedOptionCount: 5,
      keepOpen: true,
    });

    // Finally, validate the full selection after all async updates have settled
    cy.get('#multi-async').pMultiSelect({
      currentValues: ['Rome', 'Paris', 'London'],
      expectedOptionCount: 5,
      keepOpen: true,
    });
  });

});
