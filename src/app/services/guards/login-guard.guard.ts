import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../user.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuardGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  canActivate() {
    if (this.userService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
