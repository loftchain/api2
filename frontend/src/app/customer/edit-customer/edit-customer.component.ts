import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EditCustomerService} from './edit-customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  public customer = {
    name: '',
    currency_eth: 'ETH',
    wallet_eth: '',
    currency_btc: 'BTC',
    wallet_btc: ''
  };

  private id: any;

  constructor(private route: ActivatedRoute, private editCustomerService: EditCustomerService, private router: Router) { }

  ngOnInit() {
    this.findCustomer();
  }

  findCustomer() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.editCustomerService.find(this.id)
      .subscribe(data => {
        this.customer.name = data.name;
        this.customer.wallet_eth = data.wallet[0].wallet;
        this.customer.wallet_btc = data.wallet[1].wallet;
      });
  }

  updateCustomer() {
    this.editCustomerService.update(this.id, this.customer)
      .subscribe(data => this.router.navigate(['customers']));
  }

}
