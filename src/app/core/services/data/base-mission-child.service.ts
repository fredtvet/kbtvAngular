import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { BaseMissionChildSubject } from '../../subjects/base-mission-child.subject';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { MissionChild } from 'src/app/shared';
import { ConnectionService } from '../connection.service';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';

export abstract class BaseMissionChildService<T extends MissionChild> extends BaseService<T>  {

  constructor(
    apiService: ApiService,
    @Inject(BaseMissionChildSubject) protected dataSubject: BaseMissionChildSubject<T>,
    connectionService: ConnectionService,
    localStorageService: LocalStorageService,
    uri: string
  ){
    super(apiService, dataSubject, connectionService, localStorageService, uri);
  }

  getByMissionId$(missionId: number):Observable<T[]>{
    return this.dataSubject.getByMissionId$(missionId);
  }

  add$(entity: T): Observable<T>{

    if(!this.isOnline) return null;

    return this.apiService
                .post(`${this.uri}/${entity.missionId}`, entity)
                .pipe(map(data =>{
                  this.dataSubject.addOrReplace(data);
                  return data;
                }));
  }

}
