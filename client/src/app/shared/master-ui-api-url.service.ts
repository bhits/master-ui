import {Injectable} from "@angular/core";

@Injectable()
export class MasterUiApiUrlService {

  urls: Map<string, string> = new Map([
      ["MasterUiBaseUrl", "/master-ui-api/c2s"],
      ["UmsBaseUrl", "/master-ui-api/ums"],
  ]);

  constructor() {
  }

  getMasterUiBaseUrl(): string {
    return this.urls.get('MasterUiBaseUrl');
  }

  getUmsBaseUrl(): string {
        return this.urls.get('UmsBaseUrl');
  }

}
