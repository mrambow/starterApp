import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { ReproShellComponent } from './shell.component';

/** Repro 2: ion-menu does not restore focus on close; ion-menu-button reads aria-label once. */
@Component({
  standalone: true,
  imports: [IonicModule, ReproShellComponent],
  template: `
    <repro-shell title="ion-menu focus" [menuLabel]="menuLabel">
      <p>Steps: Tab to the menu button, press Enter, Tab to "Click to close the menu", press Enter.</p>
      <p>Expected: focus returns to the ion-menu-button. Actual: see log (activeElement after close).</p>
      <ion-button (click)="toggleLabel()">Change menu button aria-label at runtime</ion-button>
      <ion-button (click)="inspectLabel()">Inspect menu button name</ion-button>
      <pre>{{ log }}</pre>
    </repro-shell>
  `,
})
export class MenuPage implements OnInit {
  menuLabel = 'Menü öffnen';
  log = '';

  constructor(private readonly menu: MenuController) {}

  ngOnInit(): void {
    document.addEventListener('ionDidClose', () => {
      const el = document.activeElement;
      this.append(`after menu close: activeElement = <${el?.tagName.toLowerCase()}> ${el?.getAttribute('aria-label') ?? ''}`);
    });
  }

  toggleLabel(): void {
    this.menuLabel = this.menuLabel === 'Menü öffnen' ? 'Open menu' : 'Menü öffnen';
    setTimeout(() => this.inspectLabel(), 50);
  }

  inspectLabel(): void {
    const host = document.querySelector('ion-menu-button');
    const inner = host?.shadowRoot?.querySelector('button');
    this.append(`host aria-label="${host?.getAttribute('aria-label')}" → inner button aria-label="${inner?.getAttribute('aria-label')}"`);
  }

  private append(line: string): void {
    this.log = `${this.log}${line}\n`;
  }
}
