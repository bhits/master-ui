import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Role} from "./role.model";
import {MasterUiApiUrlService} from "../../shared/master-ui-api-url.service";
import {Observable} from "rxjs/Observable";


@Injectable()
export class RoleService {
  private umsRoleUrl:string = this.masterUiApiService.getUmsBaseUrl().concat("/users/roles");

  constructor(private http: Http, private masterUiApiService: MasterUiApiUrlService) { }

  getRoles(): Observable<Role[]>{
    return this.http.get(this.umsRoleUrl)
          .map((resp: Response) => <any>(resp.json()));
  }
}
