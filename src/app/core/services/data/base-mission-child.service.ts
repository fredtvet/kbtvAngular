import { Inject } from '@angular/core';
import { BaseService } from './base.service';
import { BaseMissionChildSubject } from '../../subjects/base-mission-child.subject';
import { ApiService } from '../api.service';
import { Observable, throwError } from 'rxjs';
import { MissionChild } from 'src/app/shared/interfaces';
import { ConnectionService } from '../connection.service';
import { map, tap } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { Notifications } from 'src/app/shared/enums';

export abstract class BaseMissionChildService<T extends MissionChild> extends BaseService<T>  {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    @Inject(BaseMissionChildSubject) protected dataSubject: BaseMissionChildSubject<T>,
    connectionService: ConnectionService,
    uri: string
  ){
    super(notificationService, apiService, dataSubject, connectionService, uri);
  }

  getByMissionId$(missionId: number):Observable<T[]>{
    return this.dataSubject.getByMissionId$(missionId);
  }

  add$(entity: T): Observable<T>{

    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å legge til.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService
                .post(`${this.uri}/${entity.missionId}`, entity)
                .pipe(map(data =>{
                  this.dataSubject.addOrReplace(data);
                  return data;
                }));
  }

}
