import { Timesheet, TimesheetWeek } from 'src/app/shared';
import { BaseService } from './base.service';
import { NotificationService } from '../notification.service';
import { ApiService } from '../api.service';
import { TimesheetSubject } from '../../subjects/timesheet.subject';
import { ConnectionService } from '../connection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimesheetStatus } from 'src/app/shared/timesheet-status.enum';
import { TimesheetWeekSubject } from '../../subjects/timesheet-week.subject';


@Injectable({
  providedIn: 'root'
})

export class TimesheetWeekService extends BaseService<TimesheetWeek> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    connectionService: ConnectionService,
    protected dataSubject: TimesheetWeekSubject,
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/TimesheetWeeks");
  }


  getByUserName$(userName: string): Observable<TimesheetWeek[]>{
    return this.dataSubject.getByUserName$(userName);
  }

  getByUserNameAndYear$(userName: string, year: number): Observable<TimesheetWeek[]>{
    return this.dataSubject.getByUserNameAndYear$(userName, year);
  }

  getDetailsByUserNameAndWeek$(userName: string, weekNr: number, year: number): Observable<TimesheetWeek>{
    return this.dataSubject.getDetailsByUserNameAndWeek$(userName, weekNr, year);
  }

  changeStatus(id: number, status: TimesheetStatus): void{
    //IMPLEMENT HTTP!
    this.dataSubject.changeStatus(id, status);
  }

  add$(){return undefined}

  update$(){return undefined}

  delete$(){return undefined}

  deleteRange$(){return undefined}
}
