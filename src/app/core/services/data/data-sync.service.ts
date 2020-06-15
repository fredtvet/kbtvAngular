import { Injectable } from '@angular/core';
import { DeviceInfoService } from '../device-info.service';
import { EmployerSubject } from './employer/employer.subject';
import { MissionTypeSubject } from './mission-type/mission-type.subject';
import { MissionImageSubject } from './mission-image/mission-image.subject';
import { MissionNoteSubject } from './mission-note/mission-note.subject';
import { MissionDocumentSubject } from './mission-document/mission-document.subject';
import { MissionSubject } from './mission/mission.subject';
import { DocumentTypeSubject } from './document-type/document-type.subject';
import { ApiService } from '../api.service';
import { retry, tap, catchError } from 'rxjs/operators';
import { NotificationService } from '../ui/notification.service';
import { Notifications } from 'src/app/shared-app/enums';
import { UserTimesheetSubject } from './user-timesheet/user-timesheet.subject';
import { HttpParams } from '@angular/common/http';
import { BaseSubject } from './abstracts/base.subject';
import { BaseEntity } from '../../models/base-entity.interface';

interface SubjectWithEntityKey{
  entityKey: string;
  subject: BaseSubject<BaseEntity>;
}

@Injectable({
  providedIn: 'root'
})

export class DataSyncService {

  private isOnline: boolean = true;
  private entitySubjects: SubjectWithEntityKey[];

  constructor(
    private apiService: ApiService,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService,
    private employerSubject: EmployerSubject,
    private missionTypeSubject: MissionTypeSubject,
    private missionImageSubject: MissionImageSubject,
    private missionNoteSubject: MissionNoteSubject,
    private missionDocumentSubject: MissionDocumentSubject,
    private missionSubject: MissionSubject,
    private documentTypeSubject: DocumentTypeSubject,
    private userTimesheetSubject: UserTimesheetSubject
  ){
    this.deviceInfoService.isOnline$.subscribe(res =>this.isOnline = res);
    this.entitySubjects = this.createEntitySubjectArrays();
  }
  
  syncAll() : void{
    if(!this.isOnline) return undefined;
    let params = new HttpParams();

    this.entitySubjects.forEach(x =>{
      let key = x.entityKey + 'Timestamp';
      let timestamp = x.subject.lastSyncTimestamp;
      params = params.set(key, timestamp ? timestamp.toString() : null);
    });

    this.apiService
      .get('/SyncAll', params)
      .pipe(retry(3), tap(data => {
        this.entitySubjects.forEach(e =>{
          let key = e.entityKey + 'Sync';
          e.subject.sync(data[key]);
        });
      }),catchError(err => {
        this.notificationService.setNotification('Noe gikk feil med synkroniseringen!' , Notifications.Error)
        throw err;
      })).subscribe();
  }

  syncIfTimePassed = (refreshTime: number): void => {
    const timeSinceLastSync = (new Date().getTime() / 1000) - this.getEarliestTimestamp();
    if(timeSinceLastSync > refreshTime) this.syncAll();             
  }

  purgeUserSpesificResources = () => {
    this.userTimesheetSubject.purge();
  }

  purgeAll = () => this.entitySubjects.forEach(x => x.subject.purge());

  private getEarliestTimestamp(): number{
    const timestamps = this.entitySubjects.map(x => x.subject.lastSyncTimestamp);
    return  timestamps.sort(function(a,b) {return a - b})[0];
  }

  private createEntitySubjectArrays(): SubjectWithEntityKey[] {
    return Object.getOwnPropertyNames(this).filter(x => x.includes('Subject')).map(x => {
      return {
        entityKey: x.replace(/Subject/g,''),
        subject: this[x]
      }
    });
  }
}
