import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { Mission } from 'src/app/shared';
import { MissionSubject } from '../../subjects/mission.subject';
import { ApiService } from '../api.service';
import { ConnectionService } from '../connection.service';

@Injectable({
  providedIn: 'root'
})

export class MissionService extends BaseService<Mission> {

  constructor(
    apiService: ApiService,
    dataSubject: MissionSubject,
    connectionService: ConnectionService,
  ){
    super(apiService, dataSubject, connectionService);
    this.uri = "/Missions";
  }

}
