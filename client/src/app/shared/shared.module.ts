import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {Md2Module, Md2Tooltip} from "md2";
import {Ng2PaginationModule} from "ng2-pagination";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";


import {UtilityService} from "./utility.service";
import {ValidationService} from "./validation.service";
import {ControlMessagesComponent} from "./control-messages/control-messages.component";
import {MasterUiApiUrlService} from "./master-ui-api-url.service";
import {ShowHidePasswordComponent} from "./show-hide-password/show-hide-password.component";

@NgModule({
  imports: [
    CommonModule,
    Md2Module,
    RouterModule
  ],
  declarations: [
    ControlMessagesComponent,
    ShowHidePasswordComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    Md2Module,
    Ng2PaginationModule,
    ReactiveFormsModule,
    Md2Tooltip,
    ControlMessagesComponent,
    ShowHidePasswordComponent
  ],
  providers: [
    MasterUiApiUrlService,
    UtilityService,
    DatePipe,
    ValidationService
  ]
})

export class SharedModule {
}
