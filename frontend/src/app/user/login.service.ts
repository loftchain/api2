import {Inject, Injectable} from '@angular/core';
import {ApiUrl} from './api-url';
import {TokenStorage} from './token.storage';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
// import {UserStore} from './user.store';

@Injectable()
export class LoginService {
  private isLoggedIn = false;

  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private tokenStorage: TokenStorage,
    private http: HttpClient,
    // private userStore: UserStore,
    private router: Router
  ) {
    this.isLoggedIn = tokenStorage.token !== undefined;
  }

  logIn(email: string, password: string): void {
    this.http
      .post(this.loginApi, {email: email, password: password})
      .pipe(
        map((resp: any) => resp.data),
        catchError(this.handleError)
      )
      .subscribe((resp: any) => {
        this.isLoggedIn = true;
        this.tokenStorage.set(resp.token);
        // this.userStore.setUser(resp.user);
        // this.notifyService.success('logged in');
        // this.router.navigate(['/welcome']);
      });
  }

  logOut(): void {
    this.isLoggedIn = false;
    this.tokenStorage.clear();
    this.router.navigate(['/']);
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  private get loginApi(): string {
    return this.apiUrl + '/auth';
  }

  private handleError = (errorResp: any): Promise<any> => {
    const error = errorResp.error ? errorResp.error.message : errorResp.statusText || 'An error ocurred';
    // this.notifyService.error(error);
    return Promise.reject(error);
  }
}