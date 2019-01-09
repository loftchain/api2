import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from './transaction';
import { ApiUrl } from '../resource/api-url';
import {NotificationsService} from 'angular2-notifications';
import {IFindOptions} from './find-options.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: HttpClient,
  ) { }

  getData(findOptions?: IFindOptions): Observable<Transaction[]> {
    let txUrl;

    if (findOptions) {
      txUrl = this.apiUrl + 'transactions?take=' + findOptions.take + '&skip=' + findOptions.skip;
    } else {
      txUrl = this.apiUrl + 'transactions';
    }

    return this.http.get<Transaction[]>(txUrl);
  }

  getCount(): Observable<Number> {
    return this.http.get<Number>(this.apiUrl + 'transactions/count');
  }
}
