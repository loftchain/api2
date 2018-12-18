import {Component, Inject, OnInit} from '@angular/core';
import {UserWithoutId} from '../user';
import {ApiUrl} from '../api-url';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  newUser: UserWithoutId = {
    email: '',
    firstName: '',
    lastName: ''
  };

  password = '';
  constructor(@Inject(ApiUrl) private apiUrl: string) {
  }

  ngOnInit() {
  }

  doSignUp() {
    // this.userService.createUser(this.newUser, this.password).subscribe(user => {
    //   this.notifyService.success('User created');
    //   this.loginService.logIn(user.email, this.password);
    //   this.userStore.setUser(user);
    // });
  }

}
