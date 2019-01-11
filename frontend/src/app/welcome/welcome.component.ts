import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {UserService} from '../user/user.service';
import {TokenStorage} from '../user/token.storage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public user;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
      });
  }
}
