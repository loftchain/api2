import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiUrl} from '../resource/api-url';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  messageSource: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private http: HttpClient,
    private notifications: NotificationsService
  ) { }

  deleteData(id: number, itemURL): Observable<{}> {
    this.notifications.info('successfully deleted');
    return this.http.delete(this.apiUrl + itemURL + '/' + id);
  }
}
