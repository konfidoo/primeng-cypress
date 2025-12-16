import {Component} from '@angular/core'
import {SelectModule} from 'primeng/select'
import {FormsModule} from '@angular/forms'

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

    cy.get('#sel2').pSelect({expectedOptionCount: 3, expectedOptions: ['One', 'Two', 'Three']})

    // select by attribute data-optionId
    cy.get('#sel2').pSelect({selectValue: 'id2', selectBy: 'data-optionId'})
    cy.get('#sel2').pSelect({currentValue: 'Two'})
  })

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
