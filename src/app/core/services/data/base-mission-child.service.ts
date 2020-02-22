import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { BaseMissionChildSubject } from '../../subjects/base-mission-child.subject';
import { ApiService } from '../api.service';
import { Observable, throwError } from 'rxjs';
import { MissionChild } from 'src/app/shared';
import { ConnectionService } from '../connection.service';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { NotificationService } from '../notification.service';
import { NOTIFICATIONS } from 'src/app/shared/notifications.enum';

export abstract class BaseMissionChildService<T extends MissionChild> extends BaseService<T>  {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    @Inject(BaseMissionChildSubject) protected dataSubject: BaseMissionChildSubject<T>,
    connectionService: ConnectionService,
    localStorageService: LocalStorageService,
    uri: string
  ){
    super(notificationService, apiService, dataSubject, connectionService, localStorageService, uri);
  }

  getByMissionId$(missionId: number):Observable<T[]>{
    return this.dataSubject.getByMissionId$(missionId);
  }

  add$(entity: T): Observable<T>{

    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å legge til.')
              .pipe(tap(next => {}, error => this.notificationService.setNotification(error, NOTIFICATIONS.Error)));

    return this.apiService
                .post(`${this.uri}/${entity.missionId}`, entity)
                .pipe(map(data =>{
                  this.dataSubject.addOrReplace(data);
                  return data;
                }));
  }

}
