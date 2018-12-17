import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: {
    email: string;
    password: string;
  } = {
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  doLogin() {
    // this.userService.logIn(this.user.email, this.user.password);
  }

}
