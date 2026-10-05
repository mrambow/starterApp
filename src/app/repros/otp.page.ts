import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReproShellComponent } from './shell.component';

/** Repro 1: ion-input-otp – fixed English input names, no error association, outline removed. */
@Component({
  standalone: true,
  imports: [IonicModule, ReproShellComponent],
  template: `
    <repro-shell title="ion-input-otp">
      <p>Expected: inputs named like "PIN, Ziffer 1 von 6", error text associated via aria-describedby, visible focus outline.</p>
      <p>Actual: see diagnostics below.</p>

      <ion-input-otp length="6" aria-label="PIN" aria-describedby="err" [attr.aria-invalid]="true"></ion-input-otp>
      <p id="err" role="alert">Der eingegebene PIN ist nicht korrekt.</p>

      <ion-button (click)="inspect()">Inspect inputs</ion-button>
      <pre>{{ log }}</pre>
    </repro-shell>
  `,
})
export class OtpPage {
  log = 'Tab into the component, then press "Inspect inputs".';

  inspect(): void {
    const host = document.querySelector('ion-input-otp') as HTMLElement;
    const inputs = Array.from(host.querySelectorAll('input'));
    const group = host.querySelector('[role="group"]') as HTMLElement | null;
    const lines = inputs.map((input, i) => {
      const cs = getComputedStyle(input);
      return `input ${i + 1}: aria-label="${input.getAttribute('aria-label')}" aria-describedby=${input.getAttribute('aria-describedby')} aria-invalid=${input.getAttribute('aria-invalid')} outline=${cs.outlineStyle} ${cs.outlineWidth} border=${cs.borderColor}`;
    });
    lines.unshift(`host aria-label="${host.getAttribute('aria-label')}" → group aria-label="${group?.getAttribute('aria-label')}"`);
    this.log = lines.join('\n');
  }
}
