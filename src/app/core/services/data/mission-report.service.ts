import { Injectable, Inject } from '@angular/core';
import { MissionReport, MissionReportType } from 'src/app/shared';
import { BaseMissionChildService } from './base-mission-child.service';
import { MissionReportSubject } from '../../subjects/mission-report.subject';
import { ApiService } from '../api.service';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConnectionService } from '../connection.service';
import { NotificationService } from '../notification.service';
import { NOTIFICATIONS } from 'src/app/shared/notifications.enum';

@Injectable({
  providedIn: 'root'
})

export class MissionReportService extends BaseMissionChildService<MissionReport> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionReportSubject,
    connectionService: ConnectionService
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/MissionReports");
  }

  getByMissionId$(missionId: number):Observable<MissionReport[]>{
    return super.getByMissionId$(missionId);
  }

  addReport$(missionId:number, reportType: MissionReportType, files: FileList): Observable<MissionReport>{
    if(!this.isOnline)
    return throwError('Du må være tilkoblet internett for å legge til rapporter.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, NOTIFICATIONS.Error)));

    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('MissionReportType',JSON.stringify(reportType));

    return this
            .apiService
            .post(`${this.uri}/${missionId}`,formData)
            .pipe(map(data =>{
              console.log(data);
              this.dataSubject.addOrReplace(data);
              return data;
            }));
  }

  add$(entity: MissionReport): Observable<MissionReport>{return undefined}
  update$(entity: MissionReport): Observable<MissionReport>{return undefined}
}
