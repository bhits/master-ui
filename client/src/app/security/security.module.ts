import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {securityRoutableComponents, securityRoutableResolves, SecurityRoutingModule} from "./security-routing.module";
import {AuthenticationService} from "../security/shared/authentication.service";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {SharedModule} from "../shared/shared.module";
import {SessionStorageService} from "./shared/session-storage.service";
import {TokenService} from "./shared/token.service";
import {ProfileService} from "./shared/profile.service";
import {LayoutModule} from "../layout/layout.module";
import {RoleService} from "./shared/role.service";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule,
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [
    securityRoutableComponents,
  ],
  providers: [
    CanActivateAuthGuardService,
    AuthenticationService,
    SessionStorageService,
    TokenService,
    ProfileService,
    RoleService,
    securityRoutableResolves
  ]
})
export class SecurityModule {
}
