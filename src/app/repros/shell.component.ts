import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

/** Common page chrome for the repros: header with ion-menu-button, title, content. */
@Component({
  selector: 'repro-shell',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button [attr.aria-label]="menuLabel"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ng-content></ng-content>
    </ion-content>
  `,
  styles: [`pre { white-space: pre-wrap; background: #f4f5f8; padding: 8px; font-size: 12px; }`],
})
export class ReproShellComponent {
  @Input() title = '';
  @Input() menuLabel = 'Menü öffnen';
}
