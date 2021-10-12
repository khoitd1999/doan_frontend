import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from "./pages.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'list-product',
        loadChildren: () => import('./list-product/list-product.module').then(m => m.ListProductModule)
      },
      {
        path: 'product-detail',
        loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule)
      },
    ],
  }
  // ,
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login-admin/login-admin.module').then(m => m.LoginAdminModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
