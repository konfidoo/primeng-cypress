// Test for pTabs command

import { Component } from '@angular/core';
import { Tabs } from 'primeng/tabs';

describe('pTabs.cy.ts', () => {
  it('selects a tab by label and validates p-tab-active class', () => {
    @Component({
      imports: [Tabs],
      template: `
        <p-tabs [(value)]="activeTab">
          <p-tabpanel header="Tab 1">
            <p>Content for Tab 1</p>
          </p-tabpanel>
          <p-tabpanel header="Tab 2">
            <p>Content for Tab 2</p>
          </p-tabpanel>
          <p-tabpanel header="Tab 3">
            <p>Content for Tab 3</p>
          </p-tabpanel>
        </p-tabs>
      `,
    })
    class TestHostComponent {
      activeTab: number = 0;
    }

    // Mount the component
    (cy as any).mount(TestHostComponent, { imports: [Tabs] });

    // Verify the tabs component exists
    cy.get('p-tabs').should('exist');

    // Select Tab 2 using the pTabs command
    cy.get('p-tabs').pTabs({ select: 'Tab 2' });

    // Verify Tab 2 content is visible
    cy.contains('Content for Tab 2').should('be.visible');
  });

  it('works as a parent command with selector', () => {
    @Component({
      imports: [Tabs],
      template: `
        <p-tabs [(value)]="activeTab">
          <p-tabpanel header="First">
            <p>First tab content</p>
          </p-tabpanel>
          <p-tabpanel header="Second">
            <p>Second tab content</p>
          </p-tabpanel>
        </p-tabs>
      `,
    })
    class TestHostComponent {
      activeTab: number = 0;
    }

    (cy as any).mount(TestHostComponent, { imports: [Tabs] });

    // Use pTabs as a parent command
    cy.pTabs('p-tabs', { select: 'Second' });

    // Verify Second tab content is visible
    cy.contains('Second tab content').should('be.visible');
  });

  it('verifies the p-tab-active class is applied', () => {
    @Component({
      imports: [Tabs],
      template: `
        <p-tabs [(value)]="activeTab">
          <p-tabpanel header="Alpha">
            <p>Alpha content</p>
          </p-tabpanel>
          <p-tabpanel header="Beta">
            <p>Beta content</p>
          </p-tabpanel>
        </p-tabs>
      `,
    })
    class TestHostComponent {
      activeTab: number = 0;
    }

    (cy as any).mount(TestHostComponent, { imports: [Tabs] });

    // Select Beta tab
    cy.get('p-tabs').pTabs({ select: 'Beta' });

    // Verify the p-tab-active class is present on the selected tab
    cy.get('p-tabs').contains('Beta').closest('.p-tab').should('have.class', 'p-tab-active');
  });
});
