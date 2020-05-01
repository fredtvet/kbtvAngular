import { Timesheet } from 'src/app/shared/models';
import { TimesheetStatus, Notifications } from 'src/app/shared/enums';
import { NotificationService } from '../notification.service';
import { ApiService } from '../api.service';
import { UserTimesheetSubject } from '../../subjects/user-timesheet.subject';
import { ConnectionService } from '../connection.service';
import { Injectable } from '@angular/core';
import { Observable, throwError, combineLatest } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { DateParams, TimesheetSummary } from 'src/app/shared/interfaces';
import { BaseMissionChildService } from './base-mission-child.service';
import { MissionSubject } from '../../subjects/mission.subject';


@Injectable({
  providedIn: 'root'
})

export class UserTimesheetService extends BaseMissionChildService<Timesheet> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    connectionService: ConnectionService,
    private missionSubject: MissionSubject,
    protected dataSubject: UserTimesheetSubject
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/UserTimesheets");
  }

  getByWeekGrouped$(dateParams: DateParams): Observable<Timesheet[][]>{
    return this.dataSubject.getByWeekGrouped$(dateParams);
  }

  getByWeekRangeGrouped$(startWeek: number, endWeek: number, year: number, excludeStatus?: TimesheetStatus): Observable<TimesheetSummary[]>{
    return this.dataSubject.getByWeekRangeGrouped$(startWeek, endWeek, year,  excludeStatus);
  }

  getByWithMission$(expression: (value: Timesheet, index?: number, Array?: any[]) => boolean): Observable<Timesheet[]>{
    return combineLatest(super.getBy$(expression), this.missionSubject.getAll$()).pipe(map(([timesheets, missions]) =>{
      const missions_obj = {}; //Create associative list for faster index search
      missions.forEach(x => missions_obj[x.id] = x); 
      timesheets.forEach(t => t.mission = missions_obj[t.missionId]);
      return timesheets;
    }))
  }

  getWithMission$(id: number): Observable<Timesheet>{
    return this.dataSubject.get$(id).pipe(switchMap(entity => {
      if(entity === undefined) return throwError('Entity not found');
      return this.missionSubject.get$(entity.missionId).pipe(map(x => {
        let e = {...entity};
        e.mission = x;
        return e;
      }))
    })); 
  }

  getCount$(status: TimesheetStatus = undefined): Observable<number>{
    return this.dataSubject.getCount$(status);
  }

  update$(){return undefined}

  deleteRange$(){return undefined}


  
}
