import { Injectable, OnInit } from '@angular/core';
import { MissionImageSubject } from './mission-image.subject';
import { ApiService } from '../../api.service';
import { BaseMissionChildService } from '../abstracts/base-mission-child.service';
import { MissionImage } from 'src/app/core/models';
import { Notifications } from 'src/app/shared-app/enums';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MissionImageService extends BaseMissionChildService<MissionImage>{

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionImageSubject,
    deviceInfoService: DeviceInfoService,
    arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,  
  ){
    super(arrayHelperService, localStorageService, 'MissionImageTimestamp',
      notificationService, apiService, dataSubject, deviceInfoService, "/MissionImages");
  }

  getByMissionId$(missionId: number):Observable<MissionImage[]>{
    return super.getByMissionId$(missionId);
  }

  addImages$(missionId:number, files: FileList): Observable<MissionImage[]>{
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å legge til bilder.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    const formData: FormData = new FormData();

    for(let i = 0; i < files.length; i++){
        formData.append('file', files[i], files[i].name);
    }

    return this.apiService
                .post(`${this.uri}?missionId=${missionId}`, formData)
                .pipe(map(data =>{
                  this.dataSubject.addOrUpdateRange(data);
                  return data;
                }));
  }

  mailImages$(toEmail: string, missionImageIds: number[]){
    if(!this.isOnline)
    return throwError('Du må være tilkoblet internett for å sende epost.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService
              .post(`${this.uri}/SendImages`, {toEmail, missionImageIds});
  }

  add$(entity: MissionImage): Observable<MissionImage>{throw new Error("Method not implemented.")}

  update$(entity: MissionImage): Observable<MissionImage>{throw new Error("Method not implemented.")}

}
