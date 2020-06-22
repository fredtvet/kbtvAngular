import { Injectable } from '@angular/core';
import { Employer } from 'src/app/core/models';
import { ApiService } from '../../api.service';
import { EmployerSubject } from './employer.subject';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { BaseSyncService } from '../abstracts/base-sync.service';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { LocalStorageService } from '../../local-storage.service';


@Injectable({
  providedIn: 'root'
})

export class EmployerService extends BaseSyncService<Employer> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: EmployerSubject,
    deviceInfoService: DeviceInfoService,
    arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,  
  ){
    super(arrayHelperService, localStorageService, 'EmployerTimestamp',
      notificationService, apiService, dataSubject, deviceInfoService, "/Employers");
  }

}
