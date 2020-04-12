import { Timesheet } from 'src/app/shared/models';
import { TimesheetStatus, Notifications } from 'src/app/shared/enums';
import { NotificationService } from '../notification.service';
import { ApiService } from '../api.service';
import { UserTimesheetSubject } from '../../subjects/user-timesheet.subject';
import { ConnectionService } from '../connection.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DateParams } from 'src/app/shared/interfaces';
import { BaseMissionChildService } from './base-mission-child.service';


@Injectable({
  providedIn: 'root'
})

export class UserTimesheetService extends BaseMissionChildService<Timesheet> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    connectionService: ConnectionService,
    protected dataSubject: UserTimesheetSubject
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/Timesheets");
  }

  getByWeekGrouped$(dateParams: DateParams): Observable<Timesheet[][]>{
    return this.dataSubject.getByWeekGrouped$(dateParams);
  }

  getWithMission$(id: number): Observable<Timesheet>{
    return this.dataSubject.getWithMission$(id);
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

    if(ids.length == 0) throwError('Ingen ubekreftede timer');

    return this.apiService.put(`${this.uri}/Status`, { ids: ids, status: status})
      .pipe(map(data => {
        this.dataSubject.addOrReplaceRange(data);
        return data;
      }));
  }

  getCount$(status: TimesheetStatus = undefined): Observable<number>{
    return this.dataSubject.getCount$(status);
  }

  update$(){return undefined}

  deleteRange$(){return undefined}


  
}
