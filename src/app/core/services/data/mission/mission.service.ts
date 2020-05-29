import { Injectable, Inject } from '@angular/core';
import { BaseService } from '../abstracts/base.service';
import { Mission } from 'src/app/shared/models';
import { MissionSubject } from './mission.subject';
import { ApiService } from '../../api.service';
import { DeviceInfoService } from '../../device-info.service';
import { take, filter, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from '../../ui/notification.service';
import { Notifications } from 'src/app/shared/enums';

@Injectable({
  providedIn: 'root'
})

export class MissionService extends BaseService<Mission> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    protected dataSubject: MissionSubject,
    deviceInfoService: DeviceInfoService
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, "/Missions");
  }

  addMission$(entity: Mission, file: File){   
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å legge til ting.')
      .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));
    
    const body: FormData = new FormData();
    if(file) body.append('files', file, file.name);
    body.append('command',JSON.stringify(entity));

    return this.apiService
                .post(`${this.uri}`, body)
                .pipe(tap(data =>this.dataSubject.addOrUpdate(data)));
  }

  updateMission$(entity: Mission, file: File){   
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å gjøre oppdateringer.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));
    
    const body: FormData = new FormData();
    if(file) body.append('files', file, file.name);
    if(entity) body.append('command',JSON.stringify(entity));

    return this.apiService.put(`${this.uri}/${entity.id}`, body)
      .pipe(tap(data => this.dataSubject.update(data)));
  }

  add$(){return undefined}

  update$(){return undefined}

  getDetails$(id: number, trackHistory: boolean =  true):Observable<Mission>{
    return this.dataSubject.getDetails$(id, trackHistory);
  }

  sortByHistory(arr: Mission[]){
    let res = [...arr];
    return res.sort((a, b) => {
      return new Date(b.lastVisited || '01/01/1970').getTime() - new Date(a.lastVisited || '01/01/1970').getTime()
    });
  }

}
