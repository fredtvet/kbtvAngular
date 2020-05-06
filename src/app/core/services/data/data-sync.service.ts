import { Injectable, ApplicationRef } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { EmployerSubject } from '../../subjects/employer.subject';
import { MissionTypeSubject } from '../../subjects/mission-type.subject';
import { MissionImageSubject } from '../../subjects/mission-image.subject';
import { MissionNoteSubject } from '../../subjects/mission-note.subject';
import { MissionReportSubject } from '../../subjects/mission-report.subject';
import { MissionSubject } from '../../subjects/mission.subject';
import { ReportTypeSubject } from '../../subjects/report-type.subject';
import { ApiService } from '../api.service';
import { retry, tap, catchError, switchMap, first } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { Notifications } from 'src/app/shared/enums';
import { UserTimesheetSubject } from '../../subjects/user-timesheet.subject';
import { HttpParams } from '@angular/common/http';
import { AppConfigurationService } from '../app-configuration.service';
import { IdentityService } from '../identity.service';
import { interval, concat } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataSyncService {

  private isOnline: boolean = true;
  private injectedSubjectKeys: string[];

  private syncTimer: any;

  constructor(
    appRef: ApplicationRef,
    private apiService: ApiService,
    private identityService: IdentityService,
    private connectionService: ConnectionService,
    private notificationService: NotificationService,
    private appConfigService: AppConfigurationService,
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
    console.log('sync');
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
