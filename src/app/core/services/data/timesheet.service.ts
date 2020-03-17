import { Timesheet, TimesheetInfo } from 'src/app/shared/models';
import { TimesheetStatus, Notifications } from 'src/app/shared/enums';
import { BaseService } from './base.service';
import { NotificationService } from '../notification.service';
import { ApiService } from '../api.service';
import { TimesheetSubject } from '../../subjects/timesheet.subject';
import { ConnectionService } from '../connection.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import * as moment from 'moment';
import { tap, map } from 'rxjs/operators';
import { DateParams } from 'src/app/shared/interfaces';


@Injectable({
  providedIn: 'root'
})

export class TimesheetService extends BaseService<Timesheet> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    connectionService: ConnectionService,
    protected dataSubject: TimesheetSubject
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/Timesheets");
  }

  getWithMission$(id: number): Observable<Timesheet>{
    return this.dataSubject.getWithMission$(id);
  }

  getByMissionId$(missionId: number):Observable<Timesheet[]>{
    return this.dataSubject.getByMissionId$(missionId);
  }

  getByMissionIdWithMission$(missionId: number):Observable<TimesheetInfo>{
    return this.dataSubject.getByMissionIdWithMission$(missionId);
  }

  getByUserName$(userName: string, groupByWeek: boolean = false):Observable<Timesheet[]>{
    return this.dataSubject.getByUserName$(userName);
  }

  getByUserNameAndWeekGrouped$(userName: string, dateParams: DateParams): Observable<TimesheetInfo[]>{
    return this.dataSubject.getByUserNameAndWeekGrouped$(userName, dateParams);
  }

  getByMomentAndUserName$(date: moment.Moment, userName: string): Observable<TimesheetInfo>{
    return this.dataSubject.getByMomentAndUserName$(date, userName);
  }

  changeStatus$(id: number, status: TimesheetStatus): Observable<Timesheet>{
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å oppdatere ting.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService.put(`${this.uri}/${id}/Status`, { id: id, status: status})
      .pipe(map(data => {
        this.dataSubject.update(data);
        return data;
      }));
  }

  changeStatuses$(ids: number[], status: TimesheetStatus): Observable<Timesheet[]>{
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å oppdatere ting.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService.put(`${this.uri}/Status`, { ids: ids, status: status})
      .pipe(map(data => {
        this.dataSubject.addOrReplaceRange(data);
        return data;
      }));
  }

  update$(){return undefined}

  deleteRange$(){return undefined}
}
