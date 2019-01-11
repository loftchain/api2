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
    this.getTransactions();
    this.getTransactionsCount();
  }

  async getTransactions() {
    this.txSubscription = await this.transactionService.getData({take: this.selectedSize, skip: this.currentPage}).subscribe(data => {
      this.transactions = data;
      this.filteredTransactions = new MatTableDataSource(this.transactions);
      this.filteredTransactions.sort = this.sort;
    });
  }

  async getTransactionsCount() {
    this.txCountSubscription = await this.transactionService.getCount().subscribe(data => {
      this.transactionsCount = data;
      if (data <= this.selectedSize) {
          this.disableNext = true;
      }
    });
  }

  sendItem(item, itemUrl: string, redirect: string): void {
    const data = {
      data: item,
      url: itemUrl,
      redirect: redirect
    };
    this.deleteService.messageSource.next(data);
  }

  filterTransactions() {
    if (this.transactions) {
      this.filteredTransactions = this.transactions.filter(i => this.filteredCurrency ? this.filteredCurrency.includes(i.currency) : true)
        .filter(i => this.filteredStatus ? this.filteredStatus.includes(i.status) : true)
        .filter(i => this.filteredName !== '' ? i.customer.name.toLowerCase().indexOf(this.filteredName.toLowerCase()) !== -1 : true);
      this.filteredTransactions = new MatTableDataSource(this.filteredTransactions);
      this.filteredTransactions.sort = this.sort;
    }
  }

  paginateArrows(action: string) {
    if (action === 'next') {
      this.currentPage += this.selectedSize;
    }

    if (action === 'prev' && this.currentPage > this.selectedSize) {
      this.currentPage -= this.selectedSize;
    } else if (action === 'prev') {
      this.currentPage = 0;
    }

    this.pagSubscription = this.transactionService.getData({take: this.selectedSize, skip: this.currentPage}).subscribe(data => {
      this.transactions = data;
      this.filteredTransactions = new MatTableDataSource(this.transactions);

      if (this.selectedSize > this.transactions.length) {
        this.disableNext = true;
      } else {
        this.disableNext = false;
      }
    });
  }

  paginateSelect() {
      this.pagSubscription = this.transactionService.getData({take: this.selectedSize, skip: this.currentPage}).subscribe(data => {
          this.transactions = data;
          this.filteredTransactions = new MatTableDataSource(this.transactions);

          if (this.selectedSize > this.transactions.length) {
              this.disableNext = true;
          } else {
              this.disableNext = false;
          }
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

