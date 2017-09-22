import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.module";
import {AppRoutingModule} from "./app-routing.module";
import {CanActivateAuthGuardService} from "./security/shared/can-activate-auth-guard.service";
import {AuthenticationService} from "./security/shared/authentication.service";
import {LayoutModule} from "./layout/layout.module";
import {getBaseHref} from "./shared/common-functions";
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    //3rd Party modules
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
     // TODO: Move to core module - verify why it is not working now.

    // C2S Modules
    CoreModule,
    LayoutModule,
    AppRoutingModule // Must be the last module to be imported
  ],
  providers: [
    CanActivateAuthGuardService,
    AuthenticationService,
      {
          provide: APP_BASE_HREF,
          useFactory: getBaseHref
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
