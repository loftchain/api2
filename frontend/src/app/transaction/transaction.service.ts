import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from './transaction';
import { ApiUrl } from '../resource/api-url';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) { }

  getData(): Observable<Transaction> {
    return this.http.get<Transaction>(this.apiUrl + '/transaction');
  }

  deleteData(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/transaction/' + id);
  }

}