import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    public userService: UserService,
    private router: Router
  ){}

  canActivate(){ 
    if(this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    } 
    else if(this.userService.user === null) {
      this.router.navigate(['/login']);
      return false;
    } 
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
