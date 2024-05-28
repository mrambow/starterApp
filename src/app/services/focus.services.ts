import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ScreenReader } from '@capacitor/screen-reader';

@Injectable({ providedIn: 'root' })
export class RouterFocusService {
  constructor(private router: Router) {}

  public init() {
    this.router.events.subscribe((value) => {
      if (value instanceof RouterEvent) {
        this.focusFirst(value);
      }
    });
  }

  private async focusFirst(event: RouterEvent) {
    if (!(event instanceof NavigationEnd)) {
      console.log('skipping focusFirst');
      return;
    }

    const isScreenReaderActive = await ScreenReader.isEnabled();

    if (isScreenReaderActive.value) {
      console.log('screen reader active');
      // This prevents reading of previously focused element
      await ScreenReader.speak({ value: ' ' });
    }

    // We look for an element on an ion-content that we want to focus
    const all = document.getElementsByClassName('page-focus');
    // We repeatedly look as the previous page will eventually disappear and the new one will animate in
    let repeat = true;
    let e: Element = null;
    while (repeat) {
      let count = 0;
      for (let i = 0, max = all.length; i < max; i++) {
        if (this.getVisible(all[i] as HTMLElement)) {
          count++;
          e = all[i];
        }
      }
      repeat = count > 1;
      if (repeat) {
        await this.delay(100);
      }
    }

    if (isScreenReaderActive.value) {
      // We need to set tabindex to -1 and focus the element for the screen reader to read what we want
      (e as HTMLElement).setAttribute('tabindex', '-1');
      // This will prevent the visual change for keyboard
      (e as HTMLElement).setAttribute('outline', 'none');
    }

    console.log('fokkusing', e);

    (e as HTMLElement).focus();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getVisible(el: HTMLElement): boolean {
    // look for parent elements with class ion-page and see if ion-page-hidden class is present
    let e = el;
    while (e) {
      if (e.classList.contains('ion-page')) {
        return !e.classList.contains('ion-page-hidden');
      }
      e = e.parentElement;
    }
  }
}
