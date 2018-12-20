import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options = {
    timeOut: 5000,
    animate: 'scale'
  };
  constructor() {}
  ngOnInit() {
  }
}
