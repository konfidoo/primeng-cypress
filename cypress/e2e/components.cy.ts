describe('PrimeNG commands in a running Angular app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens an Accordion panel', () => {
    cy.contains('p', 'Summary content').should('be.visible');
    cy.pAccordion('#accordion', {expectedPanelCount: 2, activePanel: 'Summary', openPanel: 'Details'});
    cy.contains('p', 'Accordion details').should('be.visible');
    cy.contains('p', 'Summary content').should('not.be.visible');
  });

  it('clicks a Button and validates a disabled Button', () => {
    cy.pButton('#counter', {expectLabel: 'Increment', disabled: false, click: true});
    cy.get('#click-count').should('have.text', '1');
    cy.get('#disabled-button').pButton({expectLabel: 'Unavailable', disabled: true});
  });

  it('sets and toggles a Checkbox', () => {
    cy.pCheckbox('#checkbox', {currentValue: false, disabled: false, selectValue: true});
    cy.get('#checkbox-value').should('have.text', 'true');
    cy.get('#checkbox').pCheckbox({currentValue: true, toggle: true});
    cy.get('#checkbox-value').should('have.text', 'false');
  });

  it('rejects and accepts a ConfirmDialog appended to the body', () => {
    cy.get('#confirm').find('button').click();
    cy.pConfirmDialog({expectedTitle: 'Delete item', expectedText: 'Delete the selected item?', close: 'reject'});
    cy.get('#decision').should('have.text', 'Rejected');

    cy.get('#confirm').find('button').click();
    cy.get('.p-confirmdialog').pConfirmDialog({close: 'accept'});
    cy.get('#decision').should('have.text', 'Accepted');
  });

  it('closes only the targeted ConfirmDialog when two are open', () => {
    cy.get('#confirm-both').find('button').click();
    cy.get('.archive-dialog').should('be.visible');
    cy.get('.delete-dialog').should('be.visible');

    cy.pConfirmDialog('.delete-dialog', {
      expectedTitle: 'Delete item',
      expectedText: 'Delete the selected item?',
      close: 'accept',
    });
    cy.get('#decision').should('have.text', 'Accepted');
    cy.get('.delete-dialog').should('not.exist');
    cy.get('#archive-decision').should('have.text', 'Pending');

    cy.get('.archive-dialog').pConfirmDialog({expectedTitle: 'Archive item', close: 'reject'});
    cy.get('#archive-decision').should('have.text', 'Rejected');
    cy.get('.archive-dialog').should('not.exist');
  });

  it('adds and clears MultiSelect values in an overlay appended to the body', () => {
    cy.pMultiSelect('#multiselect', {
      currentValues: ['Germany'],
      expectedOptionCount: 3,
      selectValues: ['France', 'Spain'],
    });
    cy.get('#multiselect-value').should('have.text', 'de,fr,es');
    cy.get('#multiselect').pMultiSelect({clearValues: true, selectValues: ['Spain'], closeByBlur: true});
    cy.get('#multiselect-value').should('have.text', 'es');
    cy.get('.p-multiselect-overlay').should('not.exist');
  });

  it('selects and closes only the targeted MultiSelect overlay', () => {
    cy.get('#multiselect').scrollIntoView();
    cy.pMultiSelect('#multiselect', {expectedOptionCount: 3, keepOpen: true, doNotScroll: true});
    cy.pMultiSelect('#backup-multiselect', {selectValues: ['France'], doNotScroll: true});

    cy.get('#backup-multiselect-value').should('have.text', 'fr');
    cy.get('#multiselect-value').should('have.text', 'de');
    cy.get('#backup-multiselect [role="combobox"]').should('have.attr', 'aria-expanded', 'false');
    cy.get('#multiselect [role="combobox"]').should('have.attr', 'aria-expanded', 'true');
    cy.get('.p-multiselect-overlay').should('have.length', 1).and('contain.text', 'France');
  });

  it('collapses and expands a Panel', () => {
    cy.contains('p', 'Panel details').should('be.visible');
    cy.pPanel('#panel', {expectTitle: 'Panel heading', isToggleable: true, setState: 'collapsed'});
    cy.contains('p', 'Panel details').should('not.be.visible');
    cy.get('#panel').pPanel({isCollapsed: true, toggle: true});
    cy.contains('p', 'Panel details').should('be.visible');
  });

  it('changes the Select value in an overlay appended to the body', () => {
    cy.get('#select').pSelect({
      currentValue: 'Germany',
      expectedOptionCount: 3,
      expectedOptions: ['Germany', 'France', 'Spain'],
      selectValue: 'France',
      waitForOverlayAnimation: true,
    });
    cy.get('#select-value').should('have.text', 'fr');
  });

  it('switches Tabs and shows the selected content', () => {
    cy.contains('Summary tab content').should('be.visible');
    cy.pTabs({expectedTabCount: 2, activeTab: 'Tab summary', select: 'Tab details'});
    cy.contains('Details tab content').should('be.visible');
    cy.contains('Summary tab content').should('not.be.visible');
  });

  it('sets a ToggleSwitch without flipping an already selected value', () => {
    cy.pToggleSwitch('#switch', {currentValue: false, disabled: false, selectValue: true});
    cy.get('#switch-value').should('have.text', 'true');
    cy.get('#switch').pToggleSwitch({currentValue: true, selectValue: true});
    cy.get('#switch-value').should('have.text', 'true');
    cy.get('#switch').pToggleSwitch({toggle: true});
    cy.get('#switch-value').should('have.text', 'false');
  });
});
