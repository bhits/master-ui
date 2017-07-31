import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import {AuthorizationResponse} from "./access-token.model";
import {TokenService} from "./token.service";
import {Profile} from "../../core/shared/profile.model";
import {MasterUiApiUrlService} from "../../shared/master-ui-api-url.service";
import {Credentials} from "./credentials.model";
import {Observable} from "rxjs/Observable";
import {ExceptionService} from "src/app/core/exception.service";
import {UtilityService} from "src/app/shared/utility.service";


@Injectable()
export class AuthenticationService {
  oauth2TokenUrl: string = this.masterUiApiUrlService.getMasterUiBaseUrl().concat("/login");
  PATIENT_ROLE:string = 'patient';
  PROVIDER_ROLE:string = 'provider';
  STAFF_ROLE:string = 'staff';

  constructor(
              private http: Http,
              private tokenService: TokenService,
              private utilityService: UtilityService,
              private exceptionService: ExceptionService,
              private masterUiApiUrlService: MasterUiApiUrlService) {
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(this.oauth2TokenUrl,credentials)
                     .catch(this.exceptionService.handleError);
  }

  onLoginSuccess(loginResponse: any){
    this.tokenService.setAccessToken(loginResponse.accessToken);
    this.tokenService.setProfileToken(loginResponse.profileToken);
    this.tokenService.setUmsProfile(loginResponse.limitedProfileResponse);
    this.tokenService.setMasterUiLoginUrl(loginResponse.masterUiLoginUrl);
  }

  redirectBasedOnUserRole(role:string, clientHomeUrl:string){
    if(role === this.PATIENT_ROLE || role === this.PROVIDER_ROLE  || role === this.STAFF_ROLE ){
        this.utilityService.redirectInSameTab(clientHomeUrl);
    }
  }

  isLogin(){
    let oauth2Token:AuthorizationResponse =  this.tokenService.getAccessToken();
    let profile:Profile =  this.tokenService.getProfileToken();

    if(oauth2Token && profile){
        return true;
    }
    return false;
  }
}
