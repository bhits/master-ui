import { Injectable } from '@angular/core';
import {SessionStorageService} from "./session-storage.service";
import {AuthorizationResponse} from "./access-token.model";
import {Profile} from "../../core/shared/profile.model";
import {UmsLimitedProfile} from "./ums-limited-profile.model";


@Injectable()
export class TokenService {
  private ACCESS_TOKEN_KEY:string = 'c2s-access-token';
  private UMS_PROFILE_KEY: string = 'c2s-ums-profile';
  private MASTER_UI_LOGIN: string = 'c2s-master-ui-login';

  constructor(private sessionStorageService : SessionStorageService) { }

  getAccessToken(): AuthorizationResponse{
    return this.sessionStorageService.getItemFromSessionStorage(this.ACCESS_TOKEN_KEY);
  }

  setAccessToken(accessToken: any){
    this.sessionStorageService.setItemInSessionStorage(this.ACCESS_TOKEN_KEY, this.createTokenObject(accessToken));
  }

  deleteAccessToken(){
    this.sessionStorageService.removeItemFromSessionStorage(this.ACCESS_TOKEN_KEY);
  }

  setUmsProfile(profile: UmsLimitedProfile) {
      this.sessionStorageService.setItemInSessionStorage(this.UMS_PROFILE_KEY, profile);
  }

  setMasterUiLoginUrl(masterUiLoginUrl:string){
      this.sessionStorageService.setItemInSessionStorage(this.MASTER_UI_LOGIN, masterUiLoginUrl);
  }

  createProfileObject(uaaProfile:any): Profile{
    let profile = new Profile();
    profile.email = uaaProfile.email;
    profile.userName = uaaProfile.user_name;
    profile.givenName = uaaProfile.given_name;
    profile.familyName = uaaProfile.family_name;
    profile.name = uaaProfile.name;
    profile.userId = uaaProfile.user_id;

    return profile;
  }

  private createTokenObject(token:any): AuthorizationResponse{
    let uaaToken = new AuthorizationResponse();
    uaaToken.accessToken = token.access_token;
    uaaToken.exspiresIn = token.expires_in;
    uaaToken.jti = token.jti;
    uaaToken.refreshToken = token.refresh_token;
    uaaToken.scope = token.scope;
    uaaToken.tokenType = token.token_type;

    return token;
  }

}
