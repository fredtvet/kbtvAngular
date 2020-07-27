import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DeviceInfoService } from './device-info.service';
import { NotificationService } from './ui/notification.service';
import { Notifications } from 'src/app/shared-app/enums';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private isOnline = true;
  
  constructor(
    private http: HttpClient,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService) {
      this.deviceInfoService.isOnline$.subscribe(res =>this.isOnline = res)
    }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    if(!this.isOnline) return this.throwNotOnlineError();

    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(x => this.handleErrors(x)));
  }

  put(path: string, body: Object = {}): Observable<any> {
    if(!this.isOnline) return this.throwNotOnlineError();

    return this.http.put( `${environment.apiUrl}${path}`, body)
      .pipe(catchError(this.handleErrors));
  }

  post(path: string, body: any): Observable<any> {
    if(!this.isOnline) return this.throwNotOnlineError();

    return this.http.post(`${environment.apiUrl}${path}`, body)
      .pipe(catchError(x => this.handleErrors(x)));
  }

  delete(path: string): Observable<any> {
    if(!this.isOnline) return this.throwNotOnlineError();

    return this.http.delete( `${environment.apiUrl}${path}` )
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(response: any) {
    return  throwError(response.error || 'HttpError ' + response.status);
  }

  private throwNotOnlineError(): Observable<never> {
    return throwError('Denne funksjonen krever internett tilkobling.')
      .pipe(tap(next => {}, error => this.notificationService.notify({title: error, type: Notifications.Error})))
  }
}
