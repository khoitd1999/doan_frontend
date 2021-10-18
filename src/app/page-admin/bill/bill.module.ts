import {NgModule} from '@angular/core';

import {BillRoutingModule} from './bill-routing.module';

import {BillComponent} from './bill.component';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {NgZorroAntdModule, NzSelectModule} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";
import {PagesAdminModule} from "../../page-admin/pages-admin.module";


@NgModule({
  imports: [
    BillRoutingModule,
    CommonModule,
    NzSelectModule,
    NgZorroAntdModule,
    FormsModule,
    PagesAdminModule
  ],
  declarations: [BillComponent],
  exports: [BillComponent],
  providers: [CurrencyPipe]
})
export class BillModule {
}
