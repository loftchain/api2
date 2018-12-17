import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  constructor() { }

  ngOnInit() {
  }

  onLogout() {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
