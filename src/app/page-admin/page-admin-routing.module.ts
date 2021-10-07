import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageAdminComponent} from "./page-admin.component";

const routes: Routes = [
  {
    path: '',
    component: PageAdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      }
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./login-admin/login-admin.module').then(m => m.LoginAdminModule)
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageAdminRoutingModule { }
