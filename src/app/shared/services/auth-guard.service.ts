import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {


    return this.userService.isAuthenticated.take(1).map((isAuthenticated) => {

      if (!isAuthenticated) {
        this.router.navigateByUrl("/login")
      }

      return isAuthenticated;

    }
    );



  }
}
