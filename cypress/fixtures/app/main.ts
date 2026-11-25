import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {bootstrapApplication} from '@angular/platform-browser';
import Aura from '@primeuix/themes/aura';
import {AccordionModule} from 'primeng/accordion';
import {ConfirmationService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {providePrimeNG} from 'primeng/config';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {PanelModule} from 'primeng/panel';
import {SelectModule} from 'primeng/select';
import {TabsModule} from 'primeng/tabs';
import {ToggleSwitchModule} from 'primeng/toggleswitch';

@Component({
  selector: 'test-app',
  imports: [
    AccordionModule, ButtonModule, CheckboxModule, ConfirmDialogModule, FormsModule,
    MultiSelectModule, PanelModule, SelectModule, TabsModule, ToggleSwitchModule,
  ],
  templateUrl: './app.html',
})
class TestApp {
  private readonly confirmation = inject(ConfirmationService);

  protected readonly clicks = signal(0);
  protected readonly checked = signal(false);
  protected readonly enabled = signal(false);
  protected readonly decision = signal('Pending');
  protected readonly archiveDecision = signal('Pending');
  protected readonly country = signal('de');
  protected readonly countriesSelected = signal<string[] | null>(['de']);
  protected readonly backupCountriesSelected = signal<string[]>([]);
  protected readonly countries = [
    {label: 'Germany', value: 'de'},
    {label: 'France', value: 'fr'},
    {label: 'Spain', value: 'es'},
  ];

  protected confirm(): void {
    this.confirmation.confirm({
      key: 'delete',
      header: 'Delete item',
      message: 'Delete the selected item?',
      accept: () => this.decision.set('Accepted'),
      reject: () => this.decision.set('Rejected'),
    });
  }

  protected confirmBoth(): void {
    this.confirmation.confirm({
      key: 'archive',
      header: 'Archive item',
      message: 'Archive the selected item?',
      accept: () => this.archiveDecision.set('Accepted'),
      reject: () => this.archiveDecision.set('Rejected'),
    });
    this.confirm();
  }
}

void bootstrapApplication(TestApp, {
  providers: [ConfirmationService, providePrimeNG({theme: {preset: Aura}})],
}).catch(console.error);
