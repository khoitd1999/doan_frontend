import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pages/welcome' },
  { path: 'pages/welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'pages_admin', loadChildren: () => import('./page-admin/pages-admin.module').then(m => m.PagesAdminModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/pages/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
