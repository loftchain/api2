import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from '../../user/login.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();
  @Output() languageToggle = new EventEmitter<string>();
  constructor(private readonly loginService: LoginService) { }

  ngOnInit() {
  }

  loggedIn(): boolean {
    return this.loginService.loggedIn();
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.loginService.logOut();
    this.onClose();
  }

  onLanguageChange(language) {
    this.languageToggle.emit(language);
  }
}
