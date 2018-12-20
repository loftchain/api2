import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Currency} from '../currency';
import { ApiUrl } from '../../resource/api-url';

@Injectable({
  providedIn: 'root'
})
export class AddCurrencyService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) { }

  create(currency): Observable<Currency> {
    return this.http.post<Currency>(this.apiUrl + 'currencies', currency);
  }
}
