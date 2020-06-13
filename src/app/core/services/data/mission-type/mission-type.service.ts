import { Injectable } from '@angular/core';
import { MissionType } from 'src/app/core/models';
import { BaseService } from '../abstracts/base.service';
import { ApiService } from '../../api.service';
import { MissionTypeSubject } from './mission-type.subject';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';


@Injectable({
  providedIn: 'root'
})

export class MissionTypeService extends BaseService<MissionType> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionTypeSubject,
    deviceInfoService: DeviceInfoService
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, "/MissionTypes");
  }

}

