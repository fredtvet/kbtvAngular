import { Injectable } from '@angular/core';
import { MissionImageSubject } from '../../subjects/mission-image.subject';
import { ApiService } from '../api.service';
import { BaseMissionChildService } from './base-mission-child.service';
import { MissionImage } from 'src/app/shared/models';
import { Notifications } from 'src/app/shared/enums';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConnectionService } from '../connection.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class MissionImageService extends BaseMissionChildService<MissionImage> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionImageSubject,
    connectionService: ConnectionService
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/MissionImages");
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
                  this.dataSubject.addOrReplaceRange(data);
                  return data;
                }));
  }

  add$(entity: MissionImage): Observable<MissionImage>{return undefined}

  update$(entity: MissionImage): Observable<MissionImage>{return undefined}

}
