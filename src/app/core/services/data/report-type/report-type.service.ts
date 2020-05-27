import { Injectable } from '@angular/core';
import { ReportType } from 'src/app/shared/models';
import { BaseService } from '../abstracts/base.service';
import { ApiService } from '../../api.service';
import { ReportTypeSubject } from './report-type.subject';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';


@Injectable({
  providedIn: 'root'
})

export class ReportTypeService extends BaseService<ReportType> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: ReportTypeSubject,
    deviceInfoService: DeviceInfoService
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, "/ReportTypes");
  }

}
