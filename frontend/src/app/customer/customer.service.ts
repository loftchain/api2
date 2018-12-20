import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';
import {Observable} from 'rxjs';
import { ApiUrl } from '../user/api-url';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) { }

  getData(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + 'customers');
  }

  deleteData(id: number): Observable<{}> {
    return this.http.delete(this.apiUrl + 'customers/' + id);
  }

  create(newCustomer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl + 'customers', newCustomer);
  }

}
