import {Inject, Injectable} from '@angular/core';
import {ApiUrl} from '../../user/api-url';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditTransactionService {

  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: HttpClient,
  ) {}

  find(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'transactions/' + id);
  }

  update(id: number, transaction): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'transactions/' + id, transaction);
  }
}
