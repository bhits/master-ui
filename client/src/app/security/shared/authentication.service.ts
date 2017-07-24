import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {Http} from "@angular/http";

import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {AccessToken} from "./access-token.model";
import {TokenService} from "./token.service";
import {Profile} from "../../core/profile.model";
import {ProfileService} from "./profile.service";
import {UmsProfile} from "./ums-profile.model";
import {MasterUiApiUrlService} from "../../shared/master-ui-api-url.service";
import {Credentials} from "./credentials.model";
import {Observable} from "rxjs/Observable";
import {ExceptionService} from "src/app/core/exception.service";
import {UtilityService} from "src/app/shared/utility.service";


@Injectable()
export class AuthenticationService {
  oauth2TokenUrl: string = this.masterUiApiUrlService.getMasterUiBaseUrl().concat("/login");
  CLIENT_ID:string = 'YzJzLXVpOmNoYW5nZWl0';
  HOME:string ='home';
  LOGIN:string ='login';
  PATIENT_ROLE:string = 'patient';
  PROVIDER_ROLE:string = 'provider';
  STAFF_USER_ROLE:string = 'staffUser';

  constructor(private router: Router,
              private http: Http,
              private tokenService: TokenService,
              private globalEventManagerService: GlobalEventManagerService,
              private profileService: ProfileService,
              private utilityService: UtilityService,
              private exceptionService: ExceptionService,
              private masterUiApiUrlService: MasterUiApiUrlService) {
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(this.oauth2TokenUrl,credentials)
                      .catch(this.exceptionService.handleError);;
  }

  onLoginSuccess(loginResponse: any){
    this.tokenService.setAccessToken(loginResponse.accessToken);
    this.tokenService.storeUserProfile(loginResponse.profile);
  }

  redirectBasedOnUserRole(role:string, homeUrl:string){
    if(role === this.PATIENT_ROLE){
      window.location.replace( homeUrl);
    }else if( role === this.PROVIDER_ROLE ){
        window.location.replace( homeUrl);
    }else if( role === this.STAFF_USER_ROLE ){
        window.location.replace( homeUrl);
    }
  }

  isLogin(){
    let oauth2Token:AccessToken =  this.tokenService.getAccessToken();
    let profile:Profile =  this.tokenService.getProfileToken();

    if(oauth2Token && profile){
        let umsProfile:UmsProfile =  this.profileService.getProfileFromSessionStorage();
        this.globalEventManagerService.setShowHeader(true);
        this.globalEventManagerService.setProfile(profile);
        return true;
    }
    return false;
  }

  onGetUserProfileSuccess(profile:Profile){
    this.globalEventManagerService.setShowHeader(true);
    this.globalEventManagerService.setProfile(profile);
    this.router.navigate([this.HOME]);
  }
}
