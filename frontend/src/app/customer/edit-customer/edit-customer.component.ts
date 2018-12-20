import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EditCustomerService} from './edit-customer.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  public customer = {
    name: '',
    currencyEth: 'ETH',
    walletEth: '',
    currencyBtc: 'BTC',
    walletBtc: ''
  };

  private id: any;

  constructor(
    private route: ActivatedRoute,
    private editCustomerService: EditCustomerService,
    private router: Router,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
    this.findCustomer();
  }

  findCustomer() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.editCustomerService.find(this.id)
      .subscribe(data => {
        this.customer.name = data.name;
        this.customer.walletEth = data.wallet[0].wallet;
        this.customer.walletBtc = data.wallet[1].wallet;
      });
  }

  updateCustomer() {
    this.editCustomerService.update(this.id, this.customer)
      .subscribe(data => {
        this.router.navigate(['customers']);
        this.notifications.info('customer information was successfully updated');
      });
  }

}
