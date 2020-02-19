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
import { retry, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DataSyncService {

  private isOnline: boolean = true;
  private syncedServices = 0;
  private totalServices = 7;

  private syncing: boolean = false;

  constructor(
    private apiService: ApiService,
    private connectionService: ConnectionService,
    private employerService: EmployerService,
    private missionTypeService: MissionTypeService,
    private missionImageService: MissionImageService,
    private missionNoteService: MissionNoteService,
    private missionReportService: MissionReportService,
    private missionService: MissionService,
    private reportTypeService: ReportTypeService,
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

  syncAllData(){
    if(!this.syncing){
      this.syncing = true;
      this.employerService.dbSync().subscribe(res => this.syncDone());
      this.missionTypeService.dbSync().subscribe(res => this.syncDone());
      this.missionImageService.dbSync().subscribe(res => this.syncDone());
      this.missionNoteService.dbSync().subscribe(res => this.syncDone());
      this.missionReportService.dbSync().subscribe(res => this.syncDone());
      this.missionService.dbSync().subscribe(res => this.syncDone());
      this.reportTypeService.dbSync().subscribe(res => this.syncDone());
    }
  }

  syncAll(): Observable<any>{

    let fromDate = this.missionSubject.getTimestamp(); //Should get earliest of all subjects

    return this.apiService
      .post('/SyncAll',{ FromDate: fromDate })
      .pipe(retry(3), tap(data => {
        this.missionSubject.sync(data.missionSync);
        this.employerSubject.sync(data.employerSync);
        this.missionTypeSubject.sync(data.missionTypeSync);
        this.missionImageSubject.sync(data.missionImageSync);
        this.missionNoteSubject.sync(data.missionNoteSync);
        this.missionReportSubject.sync(data.missionReportSync);
        this.reportTypeSubject.sync(data.missionReportTypeSync);
      }))
  }

  progress$(): Observable<number>{
    return of(this.syncedServices / this.totalServices); //return progress
  }

  private syncDone(){
    this.syncedServices++;
    if(this.syncedServices == this.totalServices) this.syncing = false;
  }

}
