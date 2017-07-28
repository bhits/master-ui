import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {RoleService} from "./role.service";
import {Role} from "./role.model";

@Injectable()
export class RoleResolveService implements Resolve<any> {

  constructor(private roleService: RoleService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Role[]> {
    return this.roleService.getRoles()
      .do((roles: Role[]) => {
        return roles
      });
  }

}
