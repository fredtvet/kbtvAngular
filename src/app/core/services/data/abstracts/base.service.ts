import { Observable, throwError } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { BaseSubject } from './base.subject';
import { ApiService } from '../../api.service';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { Notifications } from 'src/app/shared-app/enums';

export abstract class BaseService<T>{

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

  getAll$(): Observable<T[]>{
    if(this.dataSubject.isEmpty) return this.populate<T[]>(this.dataSubject.getAll$());
    else return this.dataSubject.getAll$();
  }
  
  getAllDetails$ (): Observable<T[]>{
    if(this.dataSubject.isEmpty) return this.populate<T[]>(this.dataSubject.getAllDetails$());
    else return this.dataSubject.getAllDetails$();
  }
  
  get$(id: any):Observable<T>{
    if(this.dataSubject.isEmpty) return this.populate<T>(this.dataSubject.get$(id));
    else return this.dataSubject.get$(id);
  }
  
  getBy$(expression: (value: T, index?: number, Array?: any[]) => boolean): Observable<T[]>{
    if(this.dataSubject.isEmpty) return this.populate<T[]>(this.dataSubject.getBy$(expression));
    return this.dataSubject.getBy$(expression);
  }


  add$(entity: T): Observable<T>{
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å lagre.')
      .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Warning)));
 
    return this.apiService
                .post(`${this.uri}`, entity)
                .pipe(tap(data =>this.dataSubject.addOrUpdate(data)));
  }

  update$(entity: T): Observable<T>{
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å oppdatere.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Warning)));

    return this.apiService.put(`${this.uri}/${entity[this.dataSubject.entityIdentifier]}`, entity)
      .pipe(tap(data => this.dataSubject.update(data)));
  }

  delete$(id: any): Observable<boolean> {
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å slette.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Warning)));

    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(tap(bool =>{if(bool) this.dataSubject.delete(id)}));
  }

  deleteRange$(ids: any[]): Observable<boolean>{
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å slette.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Warning)));

    return this
            .apiService
            .post(`${this.uri}/DeleteRange`, {Ids: ids})
            .pipe(tap(bool =>{if(bool) this.dataSubject.deleteRange(ids)}));
  }

  purge = (): void => this.dataSubject.purge(); 
  
  protected populate<T>(returnObservable: Observable<T>): Observable<T>{
    console.log('pop')
    if(!this.isOnline) 
      return throwError('Du må være tilkoblet internett for å hente denne informasjonen.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Warning)));

    return this.apiService.get(`${this.uri}`)
    .pipe(switchMap(data => {
      this.dataSubject.populate(data);
      console.log(returnObservable)
      return returnObservable
    }));
  }
}
