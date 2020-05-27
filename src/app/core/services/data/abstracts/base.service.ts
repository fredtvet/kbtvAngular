import { Observable, throwError } from 'rxjs';
import { map, tap, retry, catchError } from 'rxjs/operators';
import { BaseSubject } from './base.subject';
import { ApiService } from '../../api.service';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { Notifications } from 'src/app/shared/enums';
import { BaseEntity } from 'src/app/shared/interfaces';
import { HttpParams } from '@angular/common/http';

export abstract class BaseService<T extends BaseEntity>{

  protected isOnline: boolean = false;

  constructor(
    protected notificationService: NotificationService,
    protected apiService: ApiService,
    protected dataSubject: BaseSubject<T>,
    protected deviceInfoService: DeviceInfoService,
    protected readonly uri:string
    ) {
      this.deviceInfoService.isOnline$.subscribe(res =>this.isOnline = res)
    }

  sync(): void{
    if(!this.isOnline) return null;
    let timestamp = this.dataSubject.getTimestamp();
    let params = new HttpParams();
    if(timestamp) params = params.set('Timestamp', timestamp.toString());

    this.apiService
      .get(`${this.uri}/Sync`, params)
      .pipe(
        retry(3),
        tap(this.dataSubject.sync),
        catchError(err => {
        this.notificationService.setNotification('Noe gikk feil med synkroniseringen!' , Notifications.Error)
        throw err;})
      )
  }

  getAll$ = (): Observable<T[]> => this.dataSubject.getAll$();

  getAll = (): T[] => this.dataSubject.getAll();

  getAllDetails$ = (): Observable<T[]> => this.dataSubject.getAllDetails$();

  get$ = (id: number):Observable<T> => this.dataSubject.get$(id);
  
  getBy$(expression: (value: T, index?: number, Array?: any[]) => boolean): Observable<T[]>{
    return this.dataSubject.getBy$(expression);
  }

  add$(entity: T): Observable<T>{

    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å legge til ting.')
      .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));
 
    return this.apiService
                .post(`${this.uri}`, entity)
                .pipe(tap(data =>this.dataSubject.addOrUpdate(data)));
  }

  update$(entity: T): Observable<T>{
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å gjøre oppdateringer.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService.put(`${this.uri}/${entity.id}`, entity)
      .pipe(tap(data => this.dataSubject.update(data)));
  }

  delete$(id: number): Observable<boolean> {

    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å slette ting.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(tap(bool =>{if(bool) this.dataSubject.delete(id)}));
  }

  deleteRange$(ids: number[]): Observable<boolean>{
    if(!this.isOnline)
    return throwError('Du må være tilkoblet internett for å slette ting.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this
            .apiService
            .post(`${this.uri}/DeleteRange`, {Ids: ids})
            .pipe(tap(bool =>{if(bool) this.dataSubject.deleteRange(ids)}));
  }

  purge = (): void => this.dataSubject.purge(); 

}
