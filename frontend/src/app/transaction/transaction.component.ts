import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TransactionService } from './transaction.service';
import { DeleteService } from '../delete/delete.service';
import {Transaction} from './transaction';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  public pagSubscription: Subscription;
  public txSubscription: Subscription;
  public txCountSubscription: Subscription;

  public selectedSize = 10;
  public currentPage = 0;
  public disableNext = false;
  public transactionsCount;

  public transactions;
  public isLoading = false;
  public filteredTransactions;
  public filteredCurrency;
  public filteredStatus;
  public filteredName = '';
  public columnsToDisplay: string[] = ['id', 'customer', 'currency', 'txId', 'from', 'amount', 'date', 'status', 'action'];
  public currencyPairs = [
    {value: 'ETH', viewValue: 'ETH'},
    {value: 'BTC', viewValue: 'BTC'}
  ];

  public statusPairs = [
    {value: 'true', viewValue: true},
    {value: 'false', viewValue: false}
  ];

  constructor(private transactionService: TransactionService, private deleteService: DeleteService) { }

  ngOnInit() {
    this.paginateArrows();
  }

  sendItem(item, itemUrl: string, redirect: string): void {
    const data = {
      data: item,
      url: itemUrl,
      redirect: redirect
    };
    this.deleteService.messageSource.next(data);
  }

  paginateArrows(action?: string) {
    this.isLoading = true;
    if (action === 'next') {
      this.currentPage += this.selectedSize;
    }
    if (action === 'prev' && this.currentPage > this.selectedSize) {
      this.currentPage -= this.selectedSize;
    } else if (action === 'prev') {
      this.currentPage = 0;
    }
    if ((this.filteredCurrency || this.filteredStatus || this.filteredName) && !action) {
      this.currentPage = 0;
    }

    this.pagSubscription = this.transactionService.getData({
        take: this.selectedSize,
        skip: this.currentPage,
        currency: this.filteredCurrency,
        status: this.filteredStatus,
        name: this.filteredName
    }).subscribe(data => {
      this.transactions = data[0];
      this.transactionsCount = data[1];
      this.filteredTransactions = new MatTableDataSource(this.transactions);
      this.filteredTransactions.sort = this.sort;

      if (this.selectedSize > this.transactions.length) {
        this.disableNext = true;
      } else {
        this.disableNext = false;
      }
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.pagSubscription) {
        this.pagSubscription.unsubscribe();
    }

    this.txSubscription.unsubscribe();
    this.txCountSubscription.unsubscribe();
  }
}

