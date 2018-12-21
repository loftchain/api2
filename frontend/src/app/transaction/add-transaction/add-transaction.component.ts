import { Component, OnInit } from '@angular/core';
import {AddTransactionService} from './add-transaction.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  public newTransaction = {
    currency: '',
    txId: '',
    amount: 0,
    date: '',
    from: '',
    status: '',
    customer: 0
  };

  public currencies = [
    {value: 'ETH', viewValue: 'ETH'},
    {value: 'BTC', viewValue: 'BTC'}
  ];

  public statuses = [
    {value: 'true', viewValue: 'true'},
    {value: 'false', viewValue: 'false'}
  ];

  public customers;

  public selectedCustomer = {
    wallets: []
  };

  constructor(
    private addTransactionService: AddTransactionService,
    private router: Router,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  createTransaction() {
    this.addTransactionService.create(this.newTransaction)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['transactions']);
        this.notifications.info('transaction was successfully created');
      });
  }

  getCustomers() {
    this.addTransactionService.getCustomers()
      .subscribe(data => {
        this.customers = data;
      });
  }

  selectCustomer(customer) {
    const wallets = this.selectedCustomer.wallets = customer.wallet;

    if (wallets.length === 0) {
      this.newTransaction.from = '';
    }
  }

}
