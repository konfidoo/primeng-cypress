/// <reference types="cypress" />

import {registerPrimeNGCommands} from '../src/commands/commands';
import {Component} from '@angular/core'
import {PanelModule} from 'primeng/panel'

/**
 * Comprehensive component tests for pPanel helper covering all options:
 * - expectTitle
 * - expectClasses
 * - isCollapsed (true/false)
 * - toggle (click header button)
 * - isToggleable (alias for toggle in helper)
 * - parent and chainable forms
 */
describe('pPanel helper - full options coverage', () => {
  it('validates expectTitle and expectClasses (parent form)', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-classes" header="My Header" class="alpha beta">
          <p class="m-0">Content</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    // Parent form usage
    cy.pPanel('#panel-classes', { expectTitle: 'My Header', expectClasses: ['alpha', 'beta'] })
  })

  it('validates initial expanded and toggles to collapsed (chainable form + toggle)', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-toggle-expanded" header="Header" [toggleable]="true">
          <p class="m-0">Lorem ipsum dolor sit amet...</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    // Initially expanded
    cy.get('#panel-toggle-expanded').pPanel({ expectTitle: 'Header', isCollapsed: false })

    // Toggle -> should collapse
    cy.get('#panel-toggle-expanded').pPanel({ toggle: true })
    cy.get('#panel-toggle-expanded').pPanel({ isCollapsed: true })
  })

  it('validates initial collapsed and toggles to expanded (parent form + toggle)', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-initial-collapsed" header="Header" [toggleable]="true" [collapsed]="true">
          <p class="m-0">Hidden content</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    // Parent usage: assert collapsed
    cy.pPanel('#panel-initial-collapsed', { expectTitle: 'Header', isCollapsed: true })

    // Toggle -> should expand
    cy.pPanel('#panel-initial-collapsed', { toggle: true })
    cy.pPanel('#panel-initial-collapsed', { isCollapsed: false })
  })

  it('validates toggleable host class when using isToggleable option', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-isToggleable" header="Header" [toggleable]="true">
          <p class="m-0">Toggleable content</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    // Verify the helper checks for the toggleable host class
    cy.get('#panel-isToggleable').pPanel({ isToggleable: true })
  })

  it('combined options: expectClasses + toggle + isCollapsed assertions', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-combined" header="Combined" class="x y" [toggleable]="true">
          <p class="m-0">Combined content</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    cy.get('#panel-combined').pPanel({ expectClasses: ['x', 'y'], isCollapsed: false })
    cy.get('#panel-combined').pPanel({ toggle: true })
    cy.get('#panel-combined').pPanel({ isCollapsed: true })
  })

  it('does not attempt to click when toggle not requested (safety)', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-no-toggle" header="NoToggle">
          <p class="m-0">Content</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    // No toggle option passed; helper should only assert title and classes if any
    cy.get('#panel-no-toggle').pPanel({ expectTitle: 'NoToggle' })
  })

  it('forces collapsed via setState regardless of current state', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-force-collapsed" header="Header" [toggleable]="true">
          <p class="m-0">Some content</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    // Ensure initially expanded
    cy.get('#panel-force-collapsed').pPanel({ isCollapsed: false })

    // Force collapse regardless of current state
    cy.get('#panel-force-collapsed').pPanel({ setState: 'collapsed' })
    cy.get('#panel-force-collapsed').pPanel({ isCollapsed: true })
  })

  it('forces expanded via setState regardless of current state', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-force-expanded" header="Header" [toggleable]="true" [collapsed]="true">
          <p class="m-0">Hidden content</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    // Ensure initially collapsed
    cy.get('#panel-force-expanded').pPanel({ isCollapsed: true })

    // Force expand regardless of current state
    cy.get('#panel-force-expanded').pPanel({ setState: 'expanded' })
    cy.get('#panel-force-expanded').pPanel({ isCollapsed: false })
  })

  it('setState takes precedence and toggle is ignored when both provided', () => {
    @Component({
      imports: [PanelModule],
      template: `
        <p-panel id="panel-setstate-toggle" header="Header" [toggleable]="true">
          <p class="m-0">Content</p>
        </p-panel>
      `
    })
    class TestHostComponent {}

    ;(cy as any).mount(TestHostComponent, {imports: [PanelModule]})

    // Ensure initially expanded
    cy.get('#panel-setstate-toggle').pPanel({ isCollapsed: false })

    // Call with conflicting options: setState forces 'expanded' but toggle=true would flip it.
    // setState must take precedence and leave the panel expanded.
    cy.get('#panel-setstate-toggle').pPanel({ setState: 'expanded', toggle: true })
    cy.get('#panel-setstate-toggle').pPanel({ isCollapsed: false })

    // Now force collapse with setState while toggle=true present; panel should be collapsed
    cy.get('#panel-setstate-toggle').pPanel({ setState: 'collapsed', toggle: true })
    cy.get('#panel-setstate-toggle').pPanel({ isCollapsed: true })
  })
})
