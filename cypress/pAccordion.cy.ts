/// <reference types="cypress" />

import {registerPrimeNGCommands} from '../src/commands/commands';
import {Component} from '@angular/core';
import {AccordionModule} from 'primeng/accordion';

registerPrimeNGCommands();

describe('pAccordion helper - full options coverage', () => {
  it('validates expectedPanelCount and expectClasses (parent form)', () => {
    @Component({
      imports: [AccordionModule],
      template: `
        <p-accordion id="accordion-basic" class="foo bar">
          <p-accordion-panel value="0">
            <p-accordion-header>Panel 1</p-accordion-header>
            <p-accordion-content>Content 1</p-accordion-content>
          </p-accordion-panel>
          <p-accordion-panel value="1">
            <p-accordion-header>Panel 2</p-accordion-header>
            <p-accordion-content>Content 2</p-accordion-content>
          </p-accordion-panel>
          <p-accordion-panel value="2">
            <p-accordion-header>Panel 3</p-accordion-header>
            <p-accordion-content>Content 3</p-accordion-content>
          </p-accordion-panel>
        </p-accordion>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [AccordionModule]});

    cy.pAccordion('#accordion-basic', {expectedPanelCount: 3, expectClasses: ['foo', 'bar']});
  });

  it('opens a panel and verifies it is active (parent form)', () => {
    @Component({
      imports: [AccordionModule],
      template: `
        <p-accordion id="accordion-open">
          <p-accordion-panel value="0">
            <p-accordion-header>Section A</p-accordion-header>
            <p-accordion-content>Content A</p-accordion-content>
          </p-accordion-panel>
          <p-accordion-panel value="1">
            <p-accordion-header>Section B</p-accordion-header>
            <p-accordion-content>Content B</p-accordion-content>
          </p-accordion-panel>
        </p-accordion>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [AccordionModule]});

    cy.pAccordion('#accordion-open', {openPanel: 'Section A'});
  });

  it('asserts active panel by header text (chainable form)', () => {
    @Component({
      imports: [AccordionModule],
      template: `
        <p-accordion id="accordion-active" [value]="'1'">
          <p-accordion-panel value="0">
            <p-accordion-header>First</p-accordion-header>
            <p-accordion-content>Content 1</p-accordion-content>
          </p-accordion-panel>
          <p-accordion-panel value="1">
            <p-accordion-header>Second</p-accordion-header>
            <p-accordion-content>Content 2</p-accordion-content>
          </p-accordion-panel>
        </p-accordion>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [AccordionModule]});

    cy.get('#accordion-active').pAccordion({activePanel: 'Second'});
  });

  it('opens a panel and then validates it is active (chainable form)', () => {
    @Component({
      imports: [AccordionModule],
      template: `
        <p-accordion id="accordion-chain">
          <p-accordion-panel value="0">
            <p-accordion-header>Alpha</p-accordion-header>
            <p-accordion-content>Alpha content</p-accordion-content>
          </p-accordion-panel>
          <p-accordion-panel value="1">
            <p-accordion-header>Beta</p-accordion-header>
            <p-accordion-content>Beta content</p-accordion-content>
          </p-accordion-panel>
        </p-accordion>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [AccordionModule]});

    cy.get('#accordion-chain').pAccordion({openPanel: 'Beta'});
    cy.get('#accordion-chain').pAccordion({activePanel: 'Beta'});
  });

  it('combined options: expectedPanelCount + openPanel', () => {
    @Component({
      imports: [AccordionModule],
      template: `
        <p-accordion id="accordion-combined">
          <p-accordion-panel value="0">
            <p-accordion-header>Item 1</p-accordion-header>
            <p-accordion-content>Item 1 content</p-accordion-content>
          </p-accordion-panel>
          <p-accordion-panel value="1">
            <p-accordion-header>Item 2</p-accordion-header>
            <p-accordion-content>Item 2 content</p-accordion-content>
          </p-accordion-panel>
        </p-accordion>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [AccordionModule]});

    cy.pAccordion('#accordion-combined', {expectedPanelCount: 2, openPanel: 'Item 1'});
  });
});
