import {Injectable} from "@angular/core";

@Injectable()
export class MasterUiApiUrlService {

  urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["accountActivationUrl", "/account/activation"],
      ["accountActivationSuccessUrl", "/account/activation-success"],
      ["accountActivationErrorUrl", "/account/activation-error"],

      // External api Url maps
      ["PcmBaseUrl", "/master-ui-api/pcm"],
      ["PlsBaseUrl", "/master-ui-api/pls"],
      ["VssBaseUrl", "/master-ui-api/vss"],
      ["UmsBaseUrl", "/master-ui-api/ums"],
      ["PhrBaseUrl", "/master-ui-api/phr"],
      ["TryPolicyBaseUrl", "/master-ui-api/try-policy"]
    ]
  );

  constructor() {
  }

  getLoginUrl(): string {
    return this.urls.get('loginUrl');
  }

  getAccountActivationUrl(): string {
    return this.urls.get('accountActivationUrl');
  }

  getAccountActivationSuccessUrl(): string {
    return this.urls.get('accountActivationSuccessUrl');
  }

  getAccountActivationErrorUrl(): string {
    return this.urls.get('accountActivationErrorUrl');
  }

  getUmsBaseUrl(): string {
    return this.urls.get('UmsBaseUrl');
  }

  getPcmBaseUrl(): string {
    return this.urls.get('PcmBaseUrl');
  }

  getPlsBaseUrl(): string {
    return this.urls.get('PlsBaseUrl');
  }

  getVssBaseUrl(): string {
    return this.urls.get('VssBaseUrl');
  }

  getPhrBaseUrl(): string {
    return this.urls.get('PhrBaseUrl');
  }

  getTryPolicyBaseUrl(): string {
    return this.urls.get('TryPolicyBaseUrl');
  }
}
