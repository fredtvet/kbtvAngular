import { Injectable } from '@angular/core';
import { MissionReportType } from 'src/app/shared/models';
import { BaseService } from '../abstracts/base.service';
import { ApiService } from '../../api.service';
import { ReportTypeSubject } from './report-type.subject';
import { ConnectionService } from '../../connection.service';
import { NotificationService } from '../../ui/notification.service';


@Injectable({
  providedIn: 'root'
})

export class ReportTypeService extends BaseService<MissionReportType> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: ReportTypeSubject,
    connectionService: ConnectionService
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/MissionReportTypes");
  }

}
