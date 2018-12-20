import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private user;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
      });

    this.userService.testAuth().subscribe(data => console.log(data));
  }

}
