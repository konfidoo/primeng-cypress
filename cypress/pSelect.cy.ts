import {Component} from '@angular/core'
import {SelectModule} from 'primeng/select'
import {FormsModule} from '@angular/forms'

@Component({
  imports: [SelectModule, FormsModule],
  template: `
    <p-select
      id="options-select"
      [(ngModel)]="country"
      [options]="countries"
      (onShow)="openCount = openCount + 1"
      (ngModelChange)="loadCountry($event)"
      appendTo="body"
    />
    <output id="selected-country">{{ country }}</output>
    <output id="select-open-count">{{ openCount }}</output>
  `,
})
class OptionsSelectComponent {
  country = 'de';
  openCount = 0;
  requestPaths: string[] = [];
  readonly countries = [
    {label: 'Germany', value: 'de'},
    {label: 'France', value: 'fr'},
    {label: 'Spain', value: 'es'},
  ];

  protected loadCountry(country: string): void {
    for (const path of this.requestPaths) {
      void fetch(`${path}?country=${country}`);
    }
  }
}

describe('pSelect.cy.ts', () => {
  it('validates currentValue and selects by label', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel" [(ngModel)]="value" [options]="options"></p-select>
        <span class="val">{{ value }}</span>
      `
    })
    class TestHostComponent {
      value = 'de'
      options = [
        {label: 'Germany', value: 'de'},
        {label: 'France', value: 'fr'},
        {label: 'Spain', value: 'es'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    // initial validation
    cy.get('#sel').pSelect({currentValue: 'Germany'})

    // select by label
    cy.get('#sel').pSelect({selectValue: 'France', selectBy: 'label'})
    cy.get('#sel').pSelect({currentValue: 'France'})
  })

  it('selects by id and validates expected options', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel2" [(ngModel)]="value" [options]="options">
          <ng-template #selectedItem let-selectedOption>
            <div class="flex items-center gap-2" [attr.data-optionId]="selectedOption.value">
              {{ selectedOption.label }}
            </div>
          </ng-template>
          <ng-template let-item #item>
            <div class="flex items-center gap-2" [attr.data-optionId]="item.value">
              {{ item.label }}
            </div>
          </ng-template>
        </p-select>
      `
    })
    class TestHostComponent {
      value = null
      options = [
        {label: 'One', value: 'id1'},
        {label: 'Two', value: 'id2'},
        {label: 'Three', value: 'id3'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    cy.get('#sel2').pSelect({
      expectedOptionCount: 3,
      expectedOptions: ['One', 'Two', 'Three'],
      selectValue: 'id2',
      selectBy: 'data-optionId',
    });
    cy.get('#sel2').pSelect({currentValue: 'Two'})
  })

  it('inspects options without selecting and restores the previous overlay state', () => {
    cy.mount(OptionsSelectComponent);

    cy.pSelect('#options-select', {expectedOptionCount: 3, expectedOptions: ['Germany', 'France', 'Spain']});
    cy.get('#select-open-count').should('have.text', '1');
    cy.get('#selected-country').should('have.text', 'de');
    cy.get('.p-select-overlay').should('not.exist');

    cy.get('#options-select [role="combobox"]').click();
    cy.get('#options-select').pSelect({expectedOptions: ['Germany', 'France']});
    cy.get('.p-select-overlay').should('be.visible');
    cy.get('#select-open-count').should('have.text', '2');
    cy.get('#selected-country').should('have.text', 'de');
  });

  it('rejects out-of-order options without selecting', {defaultCommandTimeout: 1500}, () => {
    cy.mount(OptionsSelectComponent);

    cy.on('fail', (error: Error) => {
      expect(error.message).to.include("contain text 'France'");
      return false;
    });

    cy.get('#options-select').pSelect({expectedOptions: ['France', 'Germany', 'Spain']}).then(() => {
      throw new Error('The helper accepted out-of-order options');
    });
  });

  it('rejects an incorrect option count without selecting', {defaultCommandTimeout: 1500}, () => {
    cy.mount(OptionsSelectComponent);

    cy.on('fail', (error: Error) => {
      expect(error.message).to.include("Found '3', expected '2'");
      return false;
    });

    cy.get('#options-select').pSelect({expectedOptionCount: 2}).then(() => {
      throw new Error('The helper accepted the wrong option count');
    });
  });

  for (const aliases of [['country'], ['country', 'region']]) {
    const usesAliasArray = aliases.length > 1;
    it(`waits for ${usesAliasArray ? 'all request aliases' : 'a single request alias'}`, () => {
      const paths = aliases.map((alias) => `/select-options/${alias}`);
      const completed = new Set<string>();

      aliases.forEach((alias, index) => {
        cy.intercept(
          {method: 'GET', pathname: paths[index], query: {country: 'fr'}},
          (request) => {
            request.on('after:response', () => {
              completed.add(alias);
            });
            request.reply({delay: 1000 + index * 400, body: {}});
          }
        ).as(alias);
      });

      cy.mount(OptionsSelectComponent).then(({component}) => {
        component.requestPaths = paths;
      });
      const waitAliases = aliases.map((alias) => `@${alias}`);
      cy.pSelect('#options-select', {
        selectValue: 'France',
        skipValidation: true,
        waitFor: usesAliasArray ? waitAliases : waitAliases[0],
      }).then(() => {
        expect([...completed]).to.have.members(aliases);
      });
    });
  }

  it('supports skipValidation when overlay removes the host', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel3" [(ngModel)]="value" [options]="options"></p-select>
      `
    })
    class TestHostComponent {
      value = null
      options = [
        {label: 'A', value: 'a'},
        {label: 'B', value: 'b'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    cy.get('#sel3').pSelect({selectValue: 'B', skipValidation: true})
  })


  it('validates expectClasses and supports doNotScroll option', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel4" class="c1 c2" [(ngModel)]="value" [options]="options"></p-select>
      `
    })
    class TestHostComponent {
      value = null
      options = [
        {label: 'A', value: 'a'},
        {label: 'B', value: 'b'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    // should verify classes are present and still be able to select when doNotScroll is true
    cy.get('#sel4').pSelect({expectClasses: ['c1', 'c2'], doNotScroll: true, selectValue: 'B'})
    cy.get('#sel4').pSelect({currentValue: 'B'})
  })

  it('only validates currentValue and does not open overlay when no selectValue provided', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel5" [(ngModel)]="value" [options]="options"></p-select>
        <span class="val">{{ value }}</span>
      `
    })
    class TestHostComponent {
      value = 'de'
      options = [
        {label: 'Germany', value: 'de'},
        {label: 'France', value: 'fr'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    // provide only currentValue -> helper should not attempt to open the overlay
    cy.get('#sel5').pSelect({currentValue: 'Germany'})

    // ensure overlay is not visible
    cy.get('.p-select-overlay').should('not.exist')
  })


  it('selects when appended to body', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel3" [(ngModel)]="value" [options]="options" appendTo="body"></p-select>
      `
    })
    class TestHostComponent {
      value = null
      options = [
        {label: 'A', value: 'a'},
        {label: 'B', value: 'b'},
        {label: 'C', value: 'c'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    cy.get('#sel3').pSelect({selectValue: 'B'})
  })

  it('waits for the overlay animation only when explicitly requested', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel8" [(ngModel)]="value" [options]="options" appendTo="body"></p-select>
      `
    })
    class TestHostComponent {
      value = null
      options = [
        {label: 'A', value: 'a'},
        {label: 'B', value: 'b'},
        {label: 'C', value: 'c'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    cy.get('#sel8').pSelect({selectValue: 'C', waitForOverlayAnimation: true})
    cy.get('#sel8').pSelect({currentValue: 'C'})
  })

  it('respects isDisabled option and does not open overlay when disabled', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel6" disabled [(ngModel)]="value" [options]="options"></p-select>
      `
    })
    class TestHostComponent {
      value = null
      options = [
        {label: 'A', value: 'a'},
        {label: 'B', value: 'b'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    // when isDisabled is provided the helper should assert the host is disabled and not click
    cy.get('#sel6').pSelect({isDisabled: true, currentValue: undefined})

    // overlay must not appear
    cy.get('.p-select-overlay').should('not.exist')
  })

  it('chainable form respects isDisabled flag on the element', () => {
    @Component({
      imports: [SelectModule, FormsModule],
      template: `
        <p-select id="sel7" class="p-disabled" [(ngModel)]="value" [options]="options"></p-select>
      `
    })
    class TestHostComponent {
      value = null
      options = [
        {label: 'A', value: 'a'},
        {label: 'B', value: 'b'}
      ]
    }

    ;(cy as any).mount(TestHostComponent, {imports: [SelectModule, FormsModule]})

    cy.get('#sel7').pSelect({isDisabled: true})
    cy.get('.p-select-overlay').should('not.exist')
  })

})
