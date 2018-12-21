import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EditTransactionService} from './edit-transaction.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {
  public transaction = {
    currency: '',
    txId: '',
    amount: 0,
    date: '',
    from: '',
    status: '',
    customer: 0
  };
  public statuses = [
    {value: 'true', viewValue: 'true'},
    {value: 'false', viewValue: 'false'}
  ];
  private id: any;
  public currencies = [
    {value: 'ETH', viewValue: 'ETH'},
    {value: 'BTC', viewValue: 'BTC'}
  ];

  constructor(
    private route: ActivatedRoute,
    private editTransactionService: EditTransactionService,
    private router: Router,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
    this.findTransaction();
  }

  findTransaction() {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.editTransactionService.find(this.id)
      .subscribe(data => {
        this.transaction.customer = data.customer.id;
        this.transaction.currency = data.currency;
        this.transaction.txId = data.txId;
        this.transaction.from = data.from;
        this.transaction.amount = data.amount;
        this.transaction.date = data.date;
        this.transaction.status = data.status;
      });
  }

  updateTransaction() {
    this.editTransactionService.update(this.id, this.transaction)
      .subscribe(data => {
        this.router.navigate(['transactions']);
        this.notifications.info('transaction was successfully updated');
      });
  }
}
