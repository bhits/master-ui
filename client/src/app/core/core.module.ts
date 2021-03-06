import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Http, XHRBackend, RequestOptions} from "@angular/http";
import {SlimLoadingBarService, SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {httpInterceptorServiceFactory} from "./http-interceptor.service";
import {NotificationService} from "./notification.service";
import {ExceptionService} from "./exception.service";
import {SecurityModule} from "../security/security.module";
import {TokenService} from "../security/shared/token.service";
import {BrowserService} from "./browser.service";
import {SessionStorageService} from "../security/shared/session-storage.service";
import {ConfigService} from "./config.service";

@NgModule({
  imports: [
    CommonModule,
    SecurityModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [],
  providers: [
    BrowserService,
    ExceptionService,
    NotificationService,
    ConfigService,
    {
      provide: Http,
      useFactory: httpInterceptorServiceFactory,
      deps: [XHRBackend, RequestOptions, SlimLoadingBarService, TokenService, SessionStorageService]
    }
  ],
  exports: [SlimLoadingBarModule]
})
export class CoreModule {
}


