import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from './transaction';
import { ApiUrl } from '../resource/api-url';
import {NotificationsService} from 'angular2-notifications';
import {IFindOptions} from './find-options.model';
import querystring from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: HttpClient,
  ) { }

  getData(findOptions?): Observable<Transaction[]> {
    let txUrl;

    if (findOptions) {
        const buildURLQuery = obj =>
            Object.entries(obj)
                .map(pair => pair.map(encodeURIComponent).join('='))
                .join('&');

        const newParam = {};
        for (let p in findOptions) {
            if (findOptions[p]) {
                newParam[p] = findOptions[p];
            }
        }

      txUrl = this.apiUrl + 'transactions?' + buildURLQuery(newParam);
    } else {
      txUrl = this.apiUrl + 'transactions';
    }

    return this.http.get<Transaction[]>(txUrl);
  }

  getCount(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + 'transactions/count');
  }
}
