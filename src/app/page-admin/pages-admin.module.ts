import { NgModule } from '@angular/core';
import {PageAdminRoutingModule} from "./page-admin-routing.module";
import {PageAdminComponent} from "./page-admin.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {AlertService} from "../UtilsService/alert.service";
import {CustomDatePipe} from "../UtilsService/custom.datepipe";

@NgModule({
  imports: [
    PageAdminRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [
    PageAdminComponent,
    CustomDatePipe
  ],
  exports: [
    CustomDatePipe
  ],
  providers: [
    AlertService
  ]
})
export class PagesAdminModule { }
