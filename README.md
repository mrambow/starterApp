# Ionic accessibility reproductions (branch `a11y-repros`)

Minimal reproductions for five accessibility gaps found in an Ionic 8 / Angular / Capacitor app during a
BITV / EN 301 549 audit. Each page shows the expected behaviour, the steps and a live diagnostics log,
so the finding is visible without DevTools.

| # | Page | Finding |
|---|------|---------|
| 1 | `/repro/otp` | `ion-input-otp`: inputs are named "Input n of m" only, host ARIA stays on the group, no error association, focus outline removed |
| 2 | `/repro/menu` | `ion-menu` does not restore focus to `ion-menu-button` on close; `ion-menu-button` reads `aria-label` once |
| 3 | `/repro/accordion` | `ion-accordion`: a heading cannot wrap the header button (WAI-ARIA accordion pattern) |
| 4 | `/repro/modal` | `ion-modal`: `aria-labelledby` on the host does not reach the `role="dialog"` element |
| 5 | `/repro/tabindex` | `tabindex` on the host is not forwarded into the shadow DOM – double tab stop with Full Keyboard Access on iOS |

Versions: `@ionic/angular` 8.8.5, Angular 17.3, Capacitor 6.

## Run

```bash
npm install
npx ng serve            # http://localhost:4200
```

StackBlitz: https://stackblitz.com/github/mrambow/starterApp/tree/a11y-repros

Device (Capacitor): `npx ng build && npx cap sync && npx cap run android` / `npx cap open ios`.
Page 5 needs a hardware keyboard; on iOS compare with Full Keyboard Access on and off.
