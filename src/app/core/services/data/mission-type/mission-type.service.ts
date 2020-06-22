import { Injectable } from '@angular/core';
import { MissionType } from 'src/app/core/models';
import { ApiService } from '../../api.service';
import { MissionTypeSubject } from './mission-type.subject';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { LocalStorageService } from '../../local-storage.service';
import { BaseSyncService } from '../abstracts/base-sync.service';


@Injectable({
  providedIn: 'root'
})

export class MissionTypeService extends BaseSyncService<MissionType> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionTypeSubject,
    deviceInfoService: DeviceInfoService,
    arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,  
  ){
    super(arrayHelperService, localStorageService, 'MissionTypeTimestamp',
    notificationService, apiService, dataSubject, deviceInfoService, "/MissionTypes");
  }

}

