import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from '../../user/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private readonly loginService: LoginService) {
  }

  ngOnInit() {
  }

  loggedIn(): boolean {
    return this.loginService.loggedIn();
  }

  onLogout() {
    this.loginService.logOut();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
