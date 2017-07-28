import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {LogoComponent} from "./logo/logo.component";
import {FooterComponent} from "./footer/footer.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {AuthenticationService} from "../security/shared/authentication.service";
import {UnsecuredHeaderComponent} from "./unsecured-header/unsecured-header.component";
import {PageContentComponent} from "src/app/layout/page-content/page-content.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    LogoComponent,
    FooterComponent,
    PageContentComponent,
    UnsecuredHeaderComponent],
  exports: [
    UnsecuredHeaderComponent,
    FooterComponent,
    PageContentComponent,
    MaterialModule
  ],
  providers: [AuthenticationService]
})
export class LayoutModule {
}
