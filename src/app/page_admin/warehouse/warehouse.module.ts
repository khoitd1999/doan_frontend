import { NgModule } from '@angular/core';

import { WarehouseRoutingModule } from './warehouse-routing.module';

import { WarehouseComponent } from './warehouse.component';
import {CommonModule} from "@angular/common";
import {NgZorroAntdModule} from "ng-zorro-antd";


@NgModule({
  imports: [
    WarehouseRoutingModule,
    CommonModule,
    NgZorroAntdModule,
  ],
  declarations: [WarehouseComponent],
  exports: [WarehouseComponent]
})
export class WarehouseModule { }
