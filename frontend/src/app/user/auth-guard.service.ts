import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {LoginService} from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAllowedOnState(state.url);
  }

  isAllowedOnState(url: string): boolean {
    const forbiddenWhenLoggedOut = [
      '/welcome', '/customers',
      '/customers/create', '/customers/edit', '/customers/delete',
      '/currencies', '/currencies/create',
      '/currencies/edit', '/currencies/delete', '/transactions',
      '/transactions/create', '/transactions/edit', '/transactions/delete'
    ];
    const forbiddenWhenLoggedIn = ['/login', '/signup', '/'];
    const isLoggedIn = this.loginService.loggedIn();

    if (isLoggedIn && forbiddenWhenLoggedIn.indexOf(url) > -1) {
      this.router.navigate(['/welcome']);
      return false;
    } else if (!isLoggedIn && forbiddenWhenLoggedOut.indexOf(url) > -1) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
