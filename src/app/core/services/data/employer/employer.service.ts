import { Injectable } from '@angular/core';
import { Employer } from 'src/app/shared/interfaces/models';
import { BaseService } from '../abstracts/base.service';
import { ApiService } from '../../api.service';
import { EmployerSubject } from './employer.subject';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';


@Injectable({
  providedIn: 'root'
})

export class EmployerService extends BaseService<Employer> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: EmployerSubject,
    deviceInfoService: DeviceInfoService
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, "/Employers");
  }

}
