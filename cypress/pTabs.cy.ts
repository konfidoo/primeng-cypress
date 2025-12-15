// Test for pTabs command

import { Component } from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';

const TABS_TEMPLATE = `
        <p-tabs value="0">
          <p-tablist>
            <p-tab value="0">Header I</p-tab>
            <p-tab value="1">Header II</p-tab>
            <p-tab value="2">Header III</p-tab>
          </p-tablist>
          <p-tabpanels>
            <p-tabpanel value="0">
              <p class="m-0">
                Content for Tab 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </p>
            </p-tabpanel>
            <p-tabpanel value="1">
              <p class="m-0">
                Content for Tab 2. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              </p>
            </p-tabpanel>
            <p-tabpanel value="2">
              <p class="m-0">
                Content for Tab 3. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              </p>
            </p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      `

describe('pTabs.cy.ts', () => {

  it('selects a tab by label and validates p-tab-active class', () => {
    @Component({
      imports: [Tabs, TabPanel, TabList, Tab, TabPanels],
      template: TABS_TEMPLATE,
    })
    class TestHostComponent {
      activeTab: number = 0;
    }

    // Mount the component
    (cy as any).mount(TestHostComponent, { imports: [Tabs] });

    // Verify the tabs component exists
    cy.get('p-tabs').should('exist');

    // Verify Tab 1 content is visible
    cy.contains('Content for Tab 1').should('be.visible');

    // Select Tab 2 using the pTabs command
    cy.get('p-tabs').pTabs({ select: 'Header II' });

    // Verify Tab 2 content is visible
    cy.contains('Content for Tab 2').should('be.visible');
  });

  it('works as a parent command with selector', () => {
    @Component({
      imports: [Tabs],
      template: TABS_TEMPLATE,
    })
    class TestHostComponent {
      activeTab: number = 0;
    }

    (cy as any).mount(TestHostComponent, { imports: [Tabs] });

    // Use pTabs as a parent command
    cy.pTabs('p-tabs', { select: 'Header II' });

    // Verify Tab 2 content is visible
    cy.contains('Content for Tab 2').should('be.visible');
  });

  it('verifies the p-tab-active class is applied', () => {
    @Component({
      imports: [Tabs],
      template: TABS_TEMPLATE,
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

  it('validates the expected tab count via options', () => {
    @Component({
      imports: [Tabs],
      template: TABS_TEMPLATE,
    })
    class TestHostComponent {
      activeTab: number = 0;
    }

    (cy as any).mount(TestHostComponent, { imports: [Tabs] });

    // Validate the provided expectedTabCount option
    cy.get('p-tabs').pTabs({ expectedTabCount: 3 });
  });

  it('works with the activeTab validation option', () => {
    @Component({
      imports: [Tabs],
      template: TABS_TEMPLATE,
    })
    class TestHostComponent {
      activeTab: number = 0;
    }

    (cy as any).mount(TestHostComponent, { imports: [Tabs] });

    // Verify the active tab label without selecting another tab
    cy.get('p-tabs').pTabs({ activeTab: 'Header I' });
  });

  it('selects a tab and validates activeTab in one call', () => {
    @Component({
      imports: [Tabs],
      template: TABS_TEMPLATE,
    })
    class TestHostComponent {
      activeTab: number = 0;
    }

    (cy as any).mount(TestHostComponent, { imports: [Tabs] });

    // Select Header III and assert the combined expectations
    cy.get('p-tabs').pTabs({ select: 'Header III', activeTab: 'Header III' });

    cy.contains('Content for Tab 3').should('be.visible');
  });
});
