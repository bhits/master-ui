import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {TokenService} from "../security/shared/token.service";
import {NotificationService} from "./notification.service";
import {Config} from "./shared/config.model";
import {ExceptionService} from "./exception.service";
import {MasterUiApiUrlService} from "../shared/master-ui-api-url.service";
import {SessionStorageService} from "../security/shared/session-storage.service";
import {Oauth2Client} from "./shared/oauth2-client.model";

@Injectable()
export class ConfigService {
  private C2S_CONFIG_KEY: string = 'c2s-config';

  constructor(private masterUiApiUrlService: MasterUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http,
              private notificationService: NotificationService,
              private tokenService: TokenService,
              private sessionStorageService: SessionStorageService) {
  }

  public getProviderUIConfig(): Observable<Config> {
    const resourceUrl = this.masterUiApiUrlService.getProviderUiApiConfigBaseUrl();
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Config>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getBasicAuthorizationHeader(): Observable<string> {
    const resourceUrl = this.masterUiApiUrlService.getProviderUiApiConfigBaseUrl().concat("/basicAuthorizationHeader");
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Oauth2Client>(resp.json()))
      .map(oauth2Client => oauth2Client.client.basicAuthorizationHeader)
      .catch(this.exceptionService.handleError);
  }

  public getConfigInSessionStorage(): Config {
    let config: Config = this.sessionStorageService.getItemFromSessionStorage(this.C2S_CONFIG_KEY);
    if (config != null) {
      return config;
    } else {
      // If logged in using master-ui then get config
      if(this.tokenService.getProfileToken() && this.tokenService.getAccessToken()){
        // Get config data once login
        this.getProviderUIConfig().subscribe(
          (config: Config) => {
            this.setConfigInSessionStorage(config);
          },
          (err) => {
            this.notificationService.show("Could not load configurations from the server. Please go to the Login Page and try again.");
          }
        );
      }else{
        this.notificationService.show("Could not load configurations from the server. Please go to the Login Page and try again.");
      }
    }
  }

  public setConfigInSessionStorage(config: Config): void {
    this.sessionStorageService.setItemInSessionStorage(this.C2S_CONFIG_KEY, config);
  }

  public deleteConfigInSessionStorage() {
    this.sessionStorageService.removeItemFromSessionStorage(this.C2S_CONFIG_KEY);
  }
}
