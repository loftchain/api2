import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../customer';
import { ApiUrl } from '../../resource/api-url';

@Injectable({
  providedIn: 'root'
})
export class AddCustomerService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) { }

  create(customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl + 'customers', customer);
  }
}
