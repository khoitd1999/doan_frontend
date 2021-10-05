import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import {CommonModule} from "@angular/common";
import {NgZorroAntdModule} from "ng-zorro-antd";


@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    NgZorroAntdModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
