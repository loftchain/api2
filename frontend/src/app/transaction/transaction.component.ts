import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TransactionService } from './transaction.service';
import { DeleteService } from '../delete/delete.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  }

  async getTransactions() {
    await this.transactionService.getData().subscribe(data => {
      this.transactions = data;
      this.filteredTransactions = new MatTableDataSource(this.transactions);
      this.filteredTransactions.sort = this.sort;
      this.filteredTransactions.paginator = this.paginator;
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
      this.filteredTransactions.paginator = this.paginator;
    }
  }
}

