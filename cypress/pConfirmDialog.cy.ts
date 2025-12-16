import {Component, inject, OnInit} from '@angular/core'
import {ConfirmDialogModule} from 'primeng/confirmdialog'
import {ButtonModule} from 'primeng/button'
import {ConfirmationService} from 'primeng/api';

describe('pConfirmDialog.cy.ts', () => {

  it('validates title and message and accepts', () => {
    @Component({
      imports: [ConfirmDialogModule, ButtonModule],
      providers: [ConfirmationService],
      template: `
        <p-confirmDialog></p-confirmDialog>
      `
    })
    class TestHostComponent implements OnInit {
      private readonly confirmationService = inject(ConfirmationService)

      ngOnInit() {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
        });
      }
    }
    ;(cy as any).mount(TestHostComponent, {imports: [ConfirmDialogModule, ButtonModule]})

    cy.pConfirmDialog({expectedTitle: 'Confirmation', expectedText: 'Are you sure that you want to proceed?'})
  })

  it('rejects and accepts', () => {
    @Component({
      imports: [ConfirmDialogModule, ButtonModule],
      providers: [ConfirmationService],
      template: `
        <p-confirmDialog></p-confirmDialog>
        @if (rejected) {
          <div id="rejected">Rejected</div>
        }
        @if (accepted) {
          <div id="accepted">Accepted</div>
        }

        <p-button id="showDlgBtn" (click)="showDialog()" label="showDialog"></p-button>
      `
    })
    class TestHostComponent {
      protected rejected = false;
      protected accepted = false;
      private readonly confirmationService = inject(ConfirmationService)

      public showDialog() {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          acceptLabel: 'Accept it',
          rejectLabel: 'Reject it',
          reject: () => {
            this.rejected = true;
            this.accepted = false
          },
          accept: () => {
            this.accepted = true;
            this.rejected = false;
          }
        });
      }
    }
    ;(cy as any).mount(TestHostComponent, {imports: [ConfirmDialogModule, ButtonModule]})


    cy.get('#accepted').should('not.exist')
    cy.get('#rejected').should('not.exist')

    // Reject the dialog
    cy.get('#showDlgBtn').pButton({click: true})
    cy.pConfirmDialog({close: 'reject'})
    cy.get('#accepted').should('not.exist')
    cy.get('#rejected').should('is.visible')

    // accept the dialog

    cy.get('#showDlgBtn').pButton({click: true})
    cy.pConfirmDialog({
      close: 'accept'
    })
    cy.get('#accepted').should('is.visible')
    cy.get('#rejected').should('not.exist')
  })
})

