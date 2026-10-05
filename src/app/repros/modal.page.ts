import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReproShellComponent } from './shell.component';

/** Repro 4: ion-modal – aria-labelledby on the host does not reach the role="dialog" element. */
@Component({
  standalone: true,
  imports: [IonicModule, ReproShellComponent],
  template: `
    <repro-shell title="ion-modal aria-labelledby">
      <p>Expected: the dialog is named by the visible title "Antrag stellen" (aria-labelledby).</p>
      <ion-button id="open-modal" expand="block">Open modal</ion-button>
      <ion-modal #modal trigger="open-modal" aria-labelledby="modal-title" (didPresent)="inspect()">
        <ng-template>
          <ion-header><ion-toolbar><ion-title id="modal-title">Antrag stellen</ion-title></ion-toolbar></ion-header>
          <ion-content class="ion-padding">
            <ion-button (click)="modal.dismiss()">Close</ion-button>
          </ion-content>
        </ng-template>
      </ion-modal>
      <pre>{{ log }}</pre>
    </repro-shell>
  `,
})
export class ModalPage {
  log = 'Open the modal; the dialog element is inspected on didPresent.';

  inspect(): void {
    const host = document.querySelector('ion-modal') as HTMLElement;
    const dialog = host.shadowRoot?.querySelector('[role="dialog"]');
    this.log = [
      `host aria-labelledby="${host.getAttribute('aria-labelledby')}" role=${host.getAttribute('role')}`,
      `inner [role=dialog]: aria-labelledby=${dialog?.getAttribute('aria-labelledby')} aria-label=${dialog?.getAttribute('aria-label')}`,
    ].join('\n');
  }
}
