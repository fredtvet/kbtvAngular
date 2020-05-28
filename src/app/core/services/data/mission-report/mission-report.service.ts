import { Injectable, Inject } from '@angular/core';
import { MissionReport, ReportType } from 'src/app/shared/models';
import { BaseMissionChildService } from '../abstracts/base-mission-child.service';
import { MissionReportSubject } from './mission-report.subject';
import { ApiService } from '../../api.service';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { Notifications } from 'src/app/shared/enums';

@Injectable({
  providedIn: 'root'
})

export class MissionReportService extends BaseMissionChildService<MissionReport> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionReportSubject,
    deviceInfoService: DeviceInfoService
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, "/MissionReports");
  }

  addReport$(missionId:number, reportType: ReportType, files: FileList): Observable<MissionReport>{
    if(!this.isOnline)
    return throwError('Du må være tilkoblet internett for å legge til rapporter.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('ReportType',JSON.stringify(reportType));

    return this
            .apiService
            .post(`${this.uri}?missionId=${missionId}`,formData)
            .pipe(map(data =>{
              this.dataSubject.addOrUpdate(data);
              return data;
            }));
  }

  mailReports$(toEmail: string, missionReportIds: number[]){
    if(!this.isOnline)
    return throwError('Du må være tilkoblet internett for å sende epost.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService
              .post(`${this.uri}/SendReports`, {toEmail, missionReportIds});
  }


  add$(entity: MissionReport): Observable<MissionReport>{return undefined}
  update$(entity: MissionReport): Observable<MissionReport>{return undefined}
}
