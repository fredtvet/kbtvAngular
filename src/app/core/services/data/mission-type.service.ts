import { Injectable } from '@angular/core';
import { MissionType } from 'src/app/shared/models';
import { BaseService } from './base.service';
import { ApiService } from '../api.service';
import { MissionTypeSubject } from '../../subjects/mission-type.subject';
import { ConnectionService } from '../connection.service';
import { LocalStorageService } from '../local-storage.service';
import { NotificationService } from '../notification.service';


@Injectable({
  providedIn: 'root'
})

export class MissionTypeService extends BaseService<MissionType> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionTypeSubject,
    connectionService: ConnectionService,
    localStorageService: LocalStorageService
  ){
    super(notificationService, apiService, dataSubject, connectionService, localStorageService, "/MissionTypes");
  }

}
