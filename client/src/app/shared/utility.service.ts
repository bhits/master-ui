import {Injectable} from "@angular/core";
import {DatePipe, Location} from "@angular/common";
import {Router} from "@angular/router";
import {BrowserService} from "../core/browser.service";

@Injectable()
export class UtilityService {

  constructor(private router: Router) {
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  redirectInSameTab(path: string) {
    let url:string = this.composeUrl().concat(path);
    window.location.replace(url);
  }

  private composeUrl():string{
    let protocol:string = window.location.protocol;
    let host:string = window.location.host;
    let port:string = window.location.port;
    return protocol.concat("//").concat(host).concat( port? ":".concat(port).concat("/"): "/");
  }
}
