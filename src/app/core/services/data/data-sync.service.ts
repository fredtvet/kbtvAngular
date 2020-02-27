import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { EmployerService } from './employer.service';
import { MissionNoteService } from './mission-note.service';
import { MissionReportService } from './mission-report.service';
import { MissionService } from './mission.service';
import { MissionTypeService } from './mission-type.service';
import { MissionImageService } from './mission-image.service';
import { ReportTypeService } from './report-type.service';
import { Observable, of } from 'rxjs';
import { EmployerSubject } from '../../subjects/employer.subject';
import { MissionTypeSubject } from '../../subjects/mission-type.subject';
import { MissionImageSubject } from '../../subjects/mission-image.subject';
import { MissionNoteSubject } from '../../subjects/mission-note.subject';
import { MissionReportSubject } from '../../subjects/mission-report.subject';
import { MissionSubject } from '../../subjects/mission.subject';
import { ReportTypeSubject } from '../../subjects/report-type.subject';
import { ApiService } from '../api.service';
import { retry, tap, catchError } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { NOTIFICATIONS } from 'src/app/shared/notifications.enum';


@Injectable({
  providedIn: 'root'
})

export class DataSyncService {

  private isOnline: boolean = true;

  constructor(
    private apiService: ApiService,
    private connectionService: ConnectionService,
    private notificationService: NotificationService,
    private employerSubject: EmployerSubject,
    private missionTypeSubject: MissionTypeSubject,
    private missionImageSubject: MissionImageSubject,
    private missionNoteSubject: MissionNoteSubject,
    private missionReportSubject: MissionReportSubject,
    private missionSubject: MissionSubject,
    private reportTypeSubject: ReportTypeSubject
  ){
    this.connectionService.isOnline$.subscribe(res =>this.isOnline = res)
  }

  syncAll() : void{
    if(!this.isOnline) return false;

    let fromDate = this.getEarliestTimestamp();

    this.apiService
      .post('/SyncAll',{ FromDate: fromDate })
      .pipe(retry(3), tap(data => {
        this.missionSubject.sync(data.missionSync);
        this.employerSubject.sync(data.employerSync);
        this.missionTypeSubject.sync(data.missionTypeSync);
        this.missionImageSubject.sync(data.missionImageSync);
        this.missionNoteSubject.sync(data.missionNoteSync);
        this.missionReportSubject.sync(data.missionReportSync);
        this.reportTypeSubject.sync(data.missionReportTypeSync);
      }),catchError(err => {
        this.notificationService.setNotification('Noe gikk feil med synkroniseringen!' , NOTIFICATIONS.Error)
        throw err;
      })).subscribe();
  }

  private getEarliestTimestamp(){
    let timestamps = [];
    timestamps.push(this.missionSubject.getTimestamp());
    timestamps.push(this.employerSubject.getTimestamp());
    timestamps.push(this.missionTypeSubject.getTimestamp());
    timestamps.push(this.missionImageSubject.getTimestamp());
    timestamps.push(this.missionNoteSubject.getTimestamp());
    timestamps.push(this.missionReportSubject.getTimestamp());
    timestamps.push(this.reportTypeSubject.getTimestamp());

    return  timestamps.sort(function(a,b) {
              return new Date(a).getTime() - new Date(b).getTime()
            })[0]
  }

}
