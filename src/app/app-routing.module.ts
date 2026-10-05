import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'repro/otp', pathMatch: 'full' },
  { path: 'repro/otp', loadComponent: () => import('./repros/otp.page').then((m) => m.OtpPage) },
  { path: 'repro/menu', loadComponent: () => import('./repros/menu.page').then((m) => m.MenuPage) },
  { path: 'repro/accordion', loadComponent: () => import('./repros/accordion.page').then((m) => m.AccordionPage) },
  { path: 'repro/modal', loadComponent: () => import('./repros/modal.page').then((m) => m.ModalPage) },
  { path: 'repro/tabindex', loadComponent: () => import('./repros/tabindex.page').then((m) => m.TabindexPage) },
  { path: 'folder/:id', loadChildren: () => import('./folder/folder.module').then((m) => m.FolderPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
