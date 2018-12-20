import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Pair} from '../pair';
import {AddCurrencyService} from './add-currency.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})

export class AddCurrencyComponent implements OnInit {
  public newCurrency = {
    pair: '',
    price: '',
    timestamp: ''
  };

  public pairs: Pair[] = [
    {value: 'BTC/USD', viewValue: 'BTC/USD'},
    {value: 'BTC/ETH', viewValue: 'BTC/ETH'},
    {value: 'ETH/USD', viewValue: 'ETH/USD'}
  ];

  constructor(
    private addCurrencyService: AddCurrencyService,
    private router: Router,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
  }

  createCurrency() {
    this.addCurrencyService.create(this.newCurrency)
      .subscribe(data => {
        this.router.navigate(['currencies']);
        this.notifications.info('currency information was successfully added');
      });
  }
}
