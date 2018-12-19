import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiUrl} from '../resource/api-url';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  messageSource: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(@Inject(ApiUrl) private apiUrl: string, private http: HttpClient) { }

  deleteData(id: number, itemURL): Observable<{}> {
    return this.http.delete(this.apiUrl + '/' + itemURL + '/' + id);
  }
}
