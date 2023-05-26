import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log(next);

    if(this.authService.isAuthenticated()) {
      console.log("Pasó el guard");
      return true;
    } else {
      console.error("NO pasó el guard");
      return false;
    }
  }
}
