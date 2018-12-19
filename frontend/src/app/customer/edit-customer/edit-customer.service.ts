import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../customer';
import {Observable} from 'rxjs';
import { ApiUrl } from '../../user/api-url';

@Injectable({
  providedIn: 'root'
})
export class EditCustomerService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) { }

  find(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl + 'customers/' + id);
  }

  update(id: number, customer): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl + 'customers/' + id, customer);
  }
}
