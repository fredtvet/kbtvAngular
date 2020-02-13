import { Injectable } from '@angular/core';
import { MissionReportType } from 'src/app/shared/models';
import { BaseService } from './base.service';
import { ApiService } from '../api.service';
import { ReportTypeSubject } from '../../subjects/report-type.subject';
import { ConnectionService } from '../connection.service';


@Injectable({
  providedIn: 'root'
})

export class ReportTypeService extends BaseService<MissionReportType> {

  constructor(
    apiService: ApiService,
    dataSubject: ReportTypeSubject,
    connectionService: ConnectionService,
  ){
    super(apiService, dataSubject, connectionService);
    this.uri = "/MissionReportTypes";
  }

}
