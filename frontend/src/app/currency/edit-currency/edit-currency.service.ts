import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Currency } from '../currency';
import { ApiUrl } from '../../user/api-url';

@Injectable({
  providedIn: 'root'
})
export class EditCurrencyService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) { }

  find(id: number): Observable<Currency> {
    return this.http.get<Currency>(this.apiUrl + 'currencies/' + id);
  }

  update(id: number, customer): Observable<Currency> {
    return this.http.put<Currency>(this.apiUrl + 'currencies/' + id, customer);
  }
}
