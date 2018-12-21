import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from '../transaction';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../../customer/customer';
import { ApiUrl } from '../../resource/api-url';

@Injectable({
  providedIn: 'root'
})
export class AddTransactionService {
  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: HttpClient
  ) { }

  create(transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl + 'transaction', transaction);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + 'customers');
  }
}
