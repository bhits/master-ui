import {Injectable} from "@angular/core";

@Injectable()
export class MasterUiApiUrlService {

  urls: Map<string, string> = new Map(
    [
      ["UaaBaseUrl", "/master-ui-api/uaa"],
      ["UmsBaseUrl", "/master-ui-api/ums"],
    ]
  );

  constructor() {
  }

  getUmsBaseUrl(): string {
    return this.urls.get('UmsBaseUrl');
  }

    getUaaBaseUrl(): string {
        return this.urls.get('UaaBaseUrl');
    }

}
