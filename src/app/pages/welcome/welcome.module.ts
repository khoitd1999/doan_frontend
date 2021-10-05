import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {CommonModule} from "@angular/common";
import {PagesModule} from "../pages.module";


@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    PagesModule,
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
