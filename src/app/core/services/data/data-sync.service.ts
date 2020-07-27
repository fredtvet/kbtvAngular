import { Injectable } from '@angular/core';
import { DeviceInfoService } from '../device-info.service';
import { ApiService } from '../api.service';
import { retry, tap, catchError, skip } from 'rxjs/operators';
import { NotificationService } from '../ui/notification.service';
import { Notifications } from 'src/app/shared-app/enums';
import { HttpParams } from '@angular/common/http';
import { DataSyncConfig } from './data-sync.config';

@Injectable({
  providedIn: 'root'
})

export class DataSyncService {

  private isOnline: boolean = true;
  private initialNumberOfMonths: string;

  constructor(
    private apiService: ApiService,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService,
    private dataSyncConfig: DataSyncConfig
  ){
    this.deviceInfoService.isOnline$.subscribe(res =>this.isOnline = res);  
    this.dataSyncConfig.initialNumberOfMonths$.pipe(
      tap(x => this.initialNumberOfMonths = x),
      skip(1),
      tap(x => {    
        this.purgeAll();
        this.syncAll();
      })
    ).subscribe();
  }
  
  syncAll() : void{
    if(!this.isOnline) return undefined;

    let params = new HttpParams();

    params = params.set("initialNumberOfMonths", this.initialNumberOfMonths)

    this.dataSyncConfig.syncEntities.forEach(x => {
      let timestamp = x.service.lastSyncTimestamp;
      params = params.set(x.httpRequestKey, timestamp ? timestamp.toString() : null);
    })

    this.apiService
      .get('/SyncAll', params)
      .pipe(retry(3), tap(data => {
        this.dataSyncConfig.syncEntities.forEach(s =>s.service.sync(data[s.httpResponseKey]));
      }),catchError(err => {
        this.notificationService.notify({title: 'Noe gikk feil med synkroniseringen!' , type: Notifications.Error})
        throw err;
      })).subscribe();
  }

  syncIfTimePassed = (refreshTime: number): void => {
    const timeSinceLastSync = (new Date().getTime() / 1000) - this.getEarliestTimestamp();
    if(timeSinceLastSync > refreshTime) this.syncAll();             
  }

  purgeAll = () => this.dataSyncConfig.syncEntities.forEach(x => x.service.purge());

  private getEarliestTimestamp(): number{
    const timestamps = this.dataSyncConfig.syncEntities.map(x => x.service.lastSyncTimestamp);
    return  timestamps.sort(function(a,b) {return a - b})[0];
  }
  
}
