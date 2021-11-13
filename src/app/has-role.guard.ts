import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem("USER_TOKEN") == undefined) {
      this.router.navigate(["/login"]);
      return false;
    } 
    return true;
  }
}
