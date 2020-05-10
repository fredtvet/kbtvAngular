import { Inject } from '@angular/core';
import { BaseService } from './base.service';
import { BaseMissionChildSubject } from './base-mission-child.subject';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { MissionChild } from 'src/app/shared/interfaces';
import { ConnectionService } from '../../connection.service';
import { NotificationService } from '../../notification.service';

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

}
