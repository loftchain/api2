import { Component, OnInit } from '@angular/core';
import {AddCustomerService} from './add-customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  public newCustomer = {
    name: '',
    currency_eth: 'ETH',
    wallet_eth: '',
    currency_btc: 'BTC',
    wallet_btc: ''
  };

  constructor(private addCustomerService: AddCustomerService, private router: Router) { }

  ngOnInit() {
  }

  createCustomer() {
    this.addCustomerService.create(this.newCustomer)
      .subscribe(data => {
        this.router.navigate(['customers']);
      });
  }
}
