import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BillComponent } from './bill.component';
import {AuthGuard} from "../../UtilsService/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: BillComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
