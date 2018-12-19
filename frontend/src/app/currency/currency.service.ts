import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from './currency';
import { Observable } from 'rxjs';
import { ApiUrl } from '../resource/api-url';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) { }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl + 'currencies');
  }

  deleteData(id: number): Observable<{}> {
    return this.http.delete(this.apiUrl + 'currencies/' + id);
  }

}
