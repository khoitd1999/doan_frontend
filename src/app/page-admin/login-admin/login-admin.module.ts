import { NgModule } from '@angular/core';

import { LoginAdminRoutingModule } from './login-admin-routing.module';

import { LoginAdminComponent } from './login-admin.component';
import {CommonModule} from "@angular/common";


@NgModule({
  imports: [
    LoginAdminRoutingModule,
    CommonModule,
  ],
  declarations: [LoginAdminComponent],
  exports: [LoginAdminComponent]
})
export class LoginAdminModule { }
