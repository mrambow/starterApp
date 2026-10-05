import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReproShellComponent } from './shell.component';

/**
 * Repro 5: tabindex on the host is not forwarded to the native element in the shadow DOM.
 * On iOS with Full Keyboard Access each control below needs two Tab presses (host + inner element);
 * without tabindex the plain Tab key skips them in WKWebView.
 */
@Component({
  standalone: true,
  imports: [IonicModule, ReproShellComponent],
  template: `
    <repro-shell title="tabindex forwarding">
      <p>Press Tab repeatedly and watch the focus log: every host with tabindex="0" produces a stop of its own before the inner element.</p>
      <ion-input label="Text field (reached without tabindex)" fill="outline"></ion-input>
      <ion-button tabindex="0">ion-button tabindex=0</ion-button>
      <ion-button>ion-button without tabindex</ion-button>
      <ion-list>
        <ion-item button tabindex="0" detail="false">ion-item button tabindex=0</ion-item>
        <ion-item button detail="false">ion-item button without tabindex</ion-item>
      </ion-list>
      <ion-select tabindex="0" label="ion-select tabindex=0" placeholder="Select">
        <ion-select-option value="a">A</ion-select-option>
      </ion-select>
      <ion-button (click)="inspect()">Inspect inner tabindex</ion-button>
      <pre>{{ log }}</pre>
    </repro-shell>
  `,
})
export class TabindexPage implements OnInit {
  log = '';

  ngOnInit(): void {
    document.addEventListener('focusin', (e) => {
      const t = e.target as HTMLElement;
      const path = e.composedPath().filter((n): n is HTMLElement => n instanceof HTMLElement).slice(0, 2).map((n) => `<${n.tagName.toLowerCase()}${n.getAttribute('tabindex') !== null ? ' tabindex=' + n.getAttribute('tabindex') : ''}>`);
      this.log = `${this.log}focus: ${path.join(' in ')} "${t.textContent?.trim().slice(0, 30) ?? ''}"\n`;
    });
  }

  inspect(): void {
    const hosts = Array.from(document.querySelectorAll('ion-button[tabindex], ion-item[tabindex], ion-select[tabindex], ion-menu-button'));
    this.log = hosts
      .map((h) => {
        const inner = h.shadowRoot?.querySelector('button, a, [tabindex]');
        return `<${h.tagName.toLowerCase()}> host tabindex=${h.getAttribute('tabindex')} → inner <${inner?.tagName.toLowerCase()}> tabindex=${inner?.getAttribute('tabindex')} delegatesFocus=${(h.shadowRoot as ShadowRoot & { delegatesFocus?: boolean })?.delegatesFocus}`;
      })
      .join('\n');
  }
}
