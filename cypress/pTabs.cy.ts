// Test for pTabs command

import {Component} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';

const IMPORTS = [Tabs, TabPanel, TabList, Tab, TabPanels];
const TABS_TEMPLATE = `
        <p-tabs value="0" class="my-test-cls">
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
      imports: IMPORTS,
      template: TABS_TEMPLATE,
    })
      // Mount the component
    class TestHostComponent {
    }

    (cy as any).mount(TestHostComponent);

    // Verify the tabs component exists
    cy.get('p-tabs').should('exist');

    // Verify Tab 1 content is visible
    cy.contains('Content for Tab 1').should('be.visible');

    // Select Tab 2 using the pTabs command
    cy.get('p-tabs').pTabs({select: 'Header II'});

    // Verify Tab 2 content is visible
    cy.contains('Content for Tab 2').should('be.visible');
  });

  it('works as a parent command with selector', () => {
    @Component({
      imports: IMPORTS,
      template: TABS_TEMPLATE,
    })
      // Mount the component
    class TestHostComponent {
    }

    (cy as any).mount(TestHostComponent);

    // Verify Tab 1 content is visible
    cy.contains('Content for Tab 1').should('be.visible');

    // Use pTabs as a parent command
    cy.pTabs('p-tabs', {select: 'Header II'});

    // Verify Tab 2 content is visible
    cy.contains('Content for Tab 2').should('be.visible');
  });


  it('validates the expected tab count via options', () => {
    @Component({
      imports: IMPORTS,
      template: TABS_TEMPLATE,
    })
      // Mount the component
    class TestHostComponent {
    }

    (cy as any).mount(TestHostComponent);

    // Validate the provided expectedTabCount option
    cy.get('p-tabs').pTabs({expectedTabCount: 3});
  });

  it('validates the expected classes option', () => {
    @Component({
      imports: IMPORTS,
      template: TABS_TEMPLATE,
    })
      // Mount the component
    class TestHostComponent {
    }

    (cy as any).mount(TestHostComponent);

    cy.get('p-tabs').pTabs({expectClasses: ['my-test-cls']});
  });

  it('works with the activeTab validation option', () => {
    @Component({
      imports: IMPORTS,
      template: TABS_TEMPLATE,
    })
      // Mount the component
    class TestHostComponent {
    }

    (cy as any).mount(TestHostComponent);

    // Verify the active tab label without selecting another tab
    cy.get('p-tabs').pTabs({activeTab: 'Header I'});
  });

  it('selects multiple options combined', () => {
    @Component({
      imports: IMPORTS,
      template: TABS_TEMPLATE,
    })
      // Mount the component
    class TestHostComponent {
    }

    (cy as any).mount(TestHostComponent);

    // Select Header III and assert that Header I is currently active
    cy.get('p-tabs').pTabs({
      expectedTabCount: 3,
      select: 'Header III',
      activeTab: 'Header I'
    });

    cy.contains('Content for Tab 3').should('be.visible');
  });
});
