import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CustomerService} from './customer.service';
import {DeleteService} from '../delete/delete.service';

export interface Pair {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public columnsToDisplay: string[] = ['id', 'name', 'wallets', 'action'];
  public customers;
  public pairs: Pair[] = [
    {value: 'pair1', viewValue: 'ETH'},
    {value: 'pair2', viewValue: 'BTC'}
  ];

  constructor(private _customerService: CustomerService, private deleteService: DeleteService) { }

  ngOnInit() {
    this.getCustomers();
  }

  async getCustomers() {
    await this._customerService.getData().subscribe(data => {
      console.log(data);
      this.customers = data;
      this.customers = new MatTableDataSource(this.customers);
      this.customers.sort = this.sort;
      this.customers.paginator = this.paginator;
      this.customers.filterPredicate = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter);
      };
    });
  }

  filterData(filterValue: string) {
    this.customers.filter = filterValue.trim().toLowerCase();
  }

  sendItem(item, itemUrl: string, redirect: string): void {
    const data = {
      data: item,
      url: itemUrl,
      redirect: redirect
    };
    this.deleteService.messageSource.next(data);
  }

}

