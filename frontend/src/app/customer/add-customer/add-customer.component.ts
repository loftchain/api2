import { Component, OnInit } from '@angular/core';
import {AddCustomerService} from './add-customer.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  public newCustomer = {
    name: '',
    currencyEth: 'ETH',
    walletEth: '',
    currencyBtc: 'BTC',
    walletBtc: ''
  };

  constructor(
    private addCustomerService: AddCustomerService,
    private router: Router,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
  }

  createCustomer() {
    this.addCustomerService.create(this.newCustomer)
      .subscribe(data => {
        this.router.navigate(['customers']);
        this.notifications.info('new customer was successfully added');
      });
  }
}
