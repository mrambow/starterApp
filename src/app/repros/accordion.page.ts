import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReproShellComponent } from './shell.component';

/** Repro 3: ion-accordion – no way to wrap the header button in a heading (WAI-ARIA accordion pattern). */
@Component({
  standalone: true,
  imports: [IonicModule, ReproShellComponent],
  template: `
    <repro-shell title="ion-accordion heading">
      <p>Expected (WAI-ARIA): a heading element contains the accordion trigger button.</p>

      <h2>A – ion-item wrapped in h3 (pattern): item is not turned into the toggle (no button, not focusable; mouse click toggles via the slot only)</h2>
      <ion-accordion-group>
        <ion-accordion value="a">
          <h3 slot="header"><ion-item>Beleg 1</ion-item></h3>
          <div class="ion-padding" slot="content">Content A</div>
        </ion-accordion>
      </ion-accordion-group>

      <h2>B – role="heading" on ion-item: role overridden by ion-item</h2>
      <ion-accordion-group>
        <ion-accordion value="b">
          <ion-item slot="header" role="heading" aria-level="3">Beleg 2</ion-item>
          <div class="ion-padding" slot="content">Content B</div>
        </ion-accordion>
      </ion-accordion-group>

      <h2>C – heading inside the item label (only working option, inverted pattern)</h2>
      <ion-accordion-group>
        <ion-accordion value="c">
          <ion-item slot="header"><ion-label><h3>Beleg 3</h3></ion-label></ion-item>
          <div class="ion-padding" slot="content">Content C</div>
        </ion-accordion>
      </ion-accordion-group>

      <ion-button (click)="inspect()">Inspect roles</ion-button>
      <pre>{{ log }}</pre>
    </repro-shell>
  `,
})
export class AccordionPage {
  log = '';

  inspect(): void {
    const items = Array.from(document.querySelectorAll('ion-accordion ion-item'));
    this.log = items
      .map((item, i) => {
        const inner = item.shadowRoot?.querySelector('button, a, div.item-native');
        return `item ${i + 1}: parent=<${item.parentElement?.tagName.toLowerCase()}> role=${item.getAttribute('role')} aria-level=${item.getAttribute('aria-level')} focusable=${item.classList.contains('ion-focusable')} inner=<${inner?.tagName.toLowerCase()}>`;
      })
      .join('\n');
  }
}
