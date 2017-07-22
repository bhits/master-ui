import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {Http, Response, RequestOptions, Headers, URLSearchParams} from "@angular/http";

import {GlobalEventManagerService} from "../../core/global-event-manager.service";
import {AccessToken} from "./access-token.model";
import {TokenService} from "./token.service";
import {Profile} from "../../core/profile.model";
import {ProfileService} from "./profile.service";
import {UmsProfile} from "./ums-profile.model";
import {MasterUiApiUrlService} from "../../shared/master-ui-api-url.service";
import {Credentials} from "./credentials.model";


@Injectable()
export class AuthenticationService {
  oauth2TokenUrl: string = this.masterUiApiUrlService.getMasterUiBaseUrl().concat("/login");
  CLIENT_ID:string = 'YzJzLXVpOmNoYW5nZWl0';
  HOME:string ='home';
  LOGIN:string ='login';

  constructor(private router: Router,
              private http: Http,
              private tokenService: TokenService,
              private globalEventManagerService: GlobalEventManagerService,
              private profileService: ProfileService,
              private masterUiApiUrlService: MasterUiApiUrlService) {
  }

  login(credentials: Credentials) {
    return this.http.post(this.oauth2TokenUrl,credentials);
  }

  onLoginSuccess(loginResponse: any){
    this.tokenService.setAccessToken(loginResponse.accessToken);
    this.tokenService.storeUserProfile(loginResponse.profile);
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
