import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  /** One page per Ionic accessibility issue; see README.md. */
  public appPages = [
    { title: '1 ion-input-otp', url: '/repro/otp', icon: 'keypad' },
    { title: '2 ion-menu focus', url: '/repro/menu', icon: 'menu' },
    { title: '3 ion-accordion heading', url: '/repro/accordion', icon: 'list' },
    { title: '4 ion-modal aria-labelledby', url: '/repro/modal', icon: 'albums' },
    { title: '5 tabindex forwarding', url: '/repro/tabindex', icon: 'return-down-forward' },
  ];
}
