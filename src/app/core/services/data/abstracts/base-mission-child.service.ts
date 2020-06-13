import { Inject } from '@angular/core';
import { BaseService } from './base.service';
import { BaseMissionChildSubject } from './base-mission-child.subject';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { MissionChild } from 'src/app/core/models/mission-child.interface';

export abstract class BaseMissionChildService<T extends MissionChild> extends BaseService<T>  {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    @Inject(BaseMissionChildSubject) protected dataSubject: BaseMissionChildSubject<T>,
    deviceInfoService: DeviceInfoService,
    uri: string
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, uri);
  }

  getByMissionId$(missionId: number):Observable<T[]>{
    return this.dataSubject.getByMissionId$(missionId);
  }

}
