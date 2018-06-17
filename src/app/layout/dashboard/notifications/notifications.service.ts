import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationModel } from '../../models/NotificationModel';
import { environment } from '../../../../environments/environment';

@Injectable()
export class NotificationsService {
  private host = 'https://iotsensordata.azurewebsites.net';
  baseUrl: string;

  constructor(
    private http: HttpClient) {
    this.host = environment.services.sensorDataService.host;
    this.baseUrl = environment.services.sensorDataService.baseUrl;
  }

  public Get(maxResults: number): Observable<NotificationModel[]> {
    let url = `${this.host}${this.baseUrl}/Notifications/?maxResults=${maxResults}`;

    return this.GetData(url);
  }

  public GetAll(): Observable<NotificationModel[]> {
    let url = `${this.host}${this.baseUrl}/Notifications/`;
    return this.GetData(url);
  }

  private GetData(url: string): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(url);
    //.map(res => res)
  }

  public Delete(id: number): Observable<void> {
    let url = `${this.host}${this.baseUrl}/Notifications/${id}`;
    return this.http.delete<void>(url);
    //.map(res => null).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}

