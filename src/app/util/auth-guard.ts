import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../core/http/auth.service";
import {Observable} from "rxjs";
import {User} from "../view/model/user";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let list:Array<string> = new Array(route.data.expectedRole)
    let u: User | null = this.auth.loggedInUserValue();
    if (u === null) {
      this.router.navigate(['sign'])
    } else if (list.find(x => x === u?.role) === null) {
      this.router.navigate(['sign'])
    }
    return true;
  }
}

