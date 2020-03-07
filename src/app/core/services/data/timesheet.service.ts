import { Timesheet } from 'src/app/shared';
import { BaseService } from './base.service';
import { NotificationService } from '../notification.service';
import { ApiService } from '../api.service';
import { TimesheetSubject } from '../../subjects/timesheet.subject';
import { ConnectionService } from '../connection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimesheetStatus } from 'src/app/shared/timesheet-status.enum';
import { TimesheetWeekSubject } from '../../subjects/timesheet-week.subject';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class TimesheetService extends BaseService<Timesheet> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    connectionService: ConnectionService,
    protected dataSubject: TimesheetSubject,
    private weekSubject: TimesheetWeekSubject
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/Timesheets");
  }

  getByMissionId$(missionId: number):Observable<Timesheet[]>{
    return this.dataSubject.getByMissionId$(missionId);
  }

  getByUserName$(userName: string):Observable<Timesheet[]>{
    return this.dataSubject.getByUserName$(userName);
  }

  getByWeekId$(weekId: number){
    return this.dataSubject.getByWeekId$(weekId);
  }

  getByMomentAndUserName$(userName: string, year: number, weekNr: number, weekDay: number){
    return this.dataSubject.getByMomentAndUserName$(userName, year, weekNr, weekDay);
  }

  changeStatuses(ids: number[], status: TimesheetStatus): void{
    this.dataSubject.changeStatuses(ids, status);
  }

  add$(entity: Timesheet): Observable<Timesheet>{
    return super.add$(entity).pipe(map(this.addForeigns));
  }

  private addForeigns(entity: Timesheet): Timesheet{
    let e = entity;
    if(e.timesheetWeekId && e.timesheetWeek.id != 0){
      this.weekSubject.addOrReplace(e.timesheetWeek);
      e.timesheetWeekId = e.timesheetWeek.id;
      e.timesheetWeek = null; //Clean up
    }
    return e;
  }

  update$(){return undefined}

  deleteRange$(){return undefined}
}
