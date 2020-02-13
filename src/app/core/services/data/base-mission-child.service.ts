import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { BaseMissionChildSubject } from '../../subjects/base-mission-child.subject';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { MissionChild } from 'src/app/shared';
import { ConnectionService } from '../connection.service';

@Injectable({
  providedIn: 'root'
})

export abstract class BaseMissionChildService<T extends MissionChild> extends BaseService<T>  {

  constructor(
    apiService: ApiService,
    @Inject(BaseMissionChildSubject) protected dataSubject: BaseMissionChildSubject<T>,
    connectionService: ConnectionService,
  ){
    super(apiService, dataSubject, connectionService);
  }

  getByMissionId$(missionId: number):Observable<T[]>{
    return this.dataSubject.getByMissionId$(missionId);
  }


}
