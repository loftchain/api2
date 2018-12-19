import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import {CurrencyService} from './currency.service';
import {DeleteService} from '../delete/delete.service';
import {Pair} from './pair';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})

export class CurrencyComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public columnsToDisplay2: string[] = ['pair', 'price', 'timestamp', 'action'];
  public currencies;
  public pairs: Pair[] = [
    {value: 'pair1', viewValue: 'BTC/USD'},
    {value: 'pair2', viewValue: 'BTC/ETH'},
    {value: 'pair3', viewValue: 'ETH/USD'}
  ];
  public deletedItem;

  constructor(private currencyService: CurrencyService, private deleteService: DeleteService) { }

  ngOnInit() {
    this.getCurrencies();
  }

  async getCurrencies() {
    await this.currencyService.getCurrencies().subscribe(data => {
      this.currencies = data;
      this.currencies = new MatTableDataSource(this.currencies);
      this.currencies.sort = this.sort;
      this.currencies.paginator = this.paginator;
    });
  }

  filterData(filterValue: string) {
    if (filterValue === 'All') {
      this.currencies.filter = '';
    } else {
      this.currencies.filter = filterValue.trim();
    }
  }

  sendItem(currency, itemUrl: string, redirect: string): void {
    const data = {
      data: currency,
      url: itemUrl,
      redirect: redirect
    };
    this.deleteService.messageSource.next(data);
  }
}
