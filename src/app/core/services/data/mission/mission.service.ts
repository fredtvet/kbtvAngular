import { Injectable } from '@angular/core';
import { BaseService } from '../abstracts/base.service';
import { Mission } from 'src/app/core/models';
import { MissionSubject } from './mission.subject';
import { ApiService } from '../../api.service';
import { DeviceInfoService } from '../../device-info.service';
import { tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from '../../ui/notification.service';
import { CreateMission, UpdateMission } from 'src/app/shared-app/interfaces/commands';
import { Notifications } from 'src/app/shared-app/enums';

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

  addMission$(command: CreateMission){   
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å legge til ting.')
      .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));
    
    const body: FormData = new FormData();
    if(command.image) body.append('files', command.image, command.image.name);
    delete command.image;
    body.append('command',JSON.stringify(command));

    return this.apiService
                .post(`${this.uri}`, body)
                .pipe(tap(data =>this.dataSubject.addOrUpdate(data)));
  }

  addMissionFromPdfReport$(pdf: File){
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å legge til ting.')
      .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));
    
    const body: FormData = new FormData();
    if(pdf) body.append('files', pdf, pdf.name);

    return this.apiService
                .post(`${this.uri}/CreateFromPdfReport`, body)
                .pipe(tap(data =>this.dataSubject.addOrUpdate(data)));
  }

  updateMission$(command: UpdateMission){   
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å gjøre oppdateringer.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));
    
    const body: FormData = new FormData();
    if(command.image) body.append('files', command.image, command.image.name);
    delete command.image
    body.append('command',JSON.stringify(command));

    return this.apiService.put(`${this.uri}/${command.id}`, body)
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

  sortByDate(arr: Mission[]){
    let res = [...arr];
    return res.sort(function(a, b){
      return new Date(b.updatedAt || '01/01/1970').getTime() - new Date(a.updatedAt || '01/01/1970').getTime()
    });
  }
}
