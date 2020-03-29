import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../user.service";

@Injectable({
  providedIn: "root"
})
export class PageLoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    if (this.userService.estaLogueado()) {
      this.router.navigate(["/"]);
      return false;
    } else {
      return true;
    }
  }
}
