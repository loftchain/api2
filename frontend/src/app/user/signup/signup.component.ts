import {Component, Inject, OnInit} from '@angular/core';
import {UserWithoutId} from '../user';
import {ApiUrl} from '../api-url';
import {UserService} from '../user.service';
import {LoginService} from '../login.service';
import {UserStore} from '../user.store';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  newUser: UserWithoutId = {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private userService: UserService,
    private loginService: LoginService,
    private userStore: UserStore,
    private notifications: NotificationsService
  ) {
  }

  ngOnInit() {
  }

  doSignUp() {
    this.userService.createUser(this.newUser).subscribe(user => {
      this.notifications.success('User created');
      this.loginService.logIn(user.email, this.newUser.password);
      // this.userStore.setUser(user);
    });
  }
}
