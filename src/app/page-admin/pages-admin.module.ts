import { NgModule } from '@angular/core';
import {PageAdminRoutingModule} from "./page-admin-routing.module";
import {PageAdminComponent} from "./page-admin.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {AlertService} from "../UtilsService/alert.service";

@NgModule({
  imports: [
    PageAdminRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [
    PageAdminComponent
  ],
  exports: [
  ],
  providers: [
    AlertService
  ]
})
export class PagesAdminModule { }
