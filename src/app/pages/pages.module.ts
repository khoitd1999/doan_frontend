import {NgModule} from '@angular/core';

import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {PagesComponent} from "./pages.component";
import {PagesRoutingModule} from "./pages-routing.module";
import {registerLocaleData} from "@angular/common";
import localeVi from "@angular/common/locales/vi";

registerLocaleData(localeVi, 'vi-VN');

@NgModule({
  imports: [
    PagesRoutingModule
  ],
  declarations: [PagesComponent, HeaderComponent, FooterComponent],
  exports: [
  ]
})
export class PagesModule {
}
