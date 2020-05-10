import { Injectable, ApplicationRef } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { EmployerSubject } from './employer/employer.subject';
import { MissionTypeSubject } from './mission-type/mission-type.subject';
import { MissionImageSubject } from './mission-image/mission-image.subject';
import { MissionNoteSubject } from './mission-note/mission-note.subject';
import { MissionReportSubject } from './mission-report/mission-report.subject';
import { MissionSubject } from './mission/mission.subject';
import { ReportTypeSubject } from './report-type/report-type.subject';
import { ApiService } from '../api.service';
import { retry, tap, catchError } from 'rxjs/operators';
import { NotificationService } from '../ui/notification.service';
import { Notifications } from 'src/app/shared/enums';
import { UserTimesheetSubject } from './user-timesheet/user-timesheet.subject';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DataSyncService {

  private isOnline: boolean = true;
  private injectedSubjectKeys: string[];

  private syncTimer: any;

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
    private reportTypeSubject: ReportTypeSubject,
    private userTimesheetSubject: UserTimesheetSubject
  ){
    this.connectionService.isOnline$.subscribe(res =>this.isOnline = res);
    this.injectedSubjectKeys = Object.getOwnPropertyNames(this).filter(x => x.includes('Subject'));
  }
  
  syncAll() : void{
    if(!this.isOnline) return undefined;
    let timestamp = this.getEarliestTimestamp();
    let params = new HttpParams();
    if(timestamp) params = params.set('Timestamp', timestamp.toString());

    this.apiService
      .get('/SyncAll', params)
      .pipe(retry(3), tap(data => {
        this.missionSubject.sync(data.missionSync);
        this.employerSubject.sync(data.employerSync);
        this.missionTypeSubject.sync(data.missionTypeSync);
        this.missionImageSubject.sync(data.missionImageSync);
        this.missionNoteSubject.sync(data.missionNoteSync);
        this.missionReportSubject.sync(data.missionReportSync);
        this.reportTypeSubject.sync(data.missionReportTypeSync);
        this.userTimesheetSubject.sync(data.userTimesheetSync);
      }),catchError(err => {
        this.notificationService.setNotification('Noe gikk feil med synkroniseringen!' , Notifications.Error)
        throw err;
      })).subscribe();
  }

  getEarliestTimestamp(): number{
    const timestamps = this.injectedSubjectKeys.map(x => this[x].getTimestamp());
    return  timestamps.sort(function(a,b) {return a - b})[0];
  }

  syncIfTimePassed = (refreshTime: number): void => {
    const timeSinceLastSync = (new Date().getTime() / 1000) - this.getEarliestTimestamp();
    if(timeSinceLastSync > refreshTime) this.syncAll();             
  }
}
