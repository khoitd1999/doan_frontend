import { NgModule } from '@angular/core';

import { ProductDetailRoutingModule } from './product-detail-routing.module';

import { ProductDetailComponent } from './product-detail.component';
import {CommonModule} from "@angular/common";
import {NgZorroAntdModule, NzSelectModule} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        ProductDetailRoutingModule,
        CommonModule,
        NzSelectModule,
        NgZorroAntdModule,
        FormsModule
    ],
  declarations: [ProductDetailComponent],
  exports: [ProductDetailComponent]
})
export class ProductDetailModule { }
