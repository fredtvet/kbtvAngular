import { Timesheet } from 'src/app/core/models';
import { TimesheetStatus } from 'src/app/shared-app/enums';
import { NotificationService } from '../../ui/notification.service';
import { ApiService } from '../../api.service';
import { UserTimesheetSubject } from './user-timesheet.subject';
import { DeviceInfoService } from '../../device-info.service';
import { Injectable } from '@angular/core';
import { Observable, throwError, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DateParams, TimesheetSummary } from 'src/app/shared-app/interfaces';
import { BaseMissionChildService } from '../abstracts/base-mission-child.service';
import { MissionSubject } from '../mission/mission.subject';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class UserTimesheetService extends BaseMissionChildService<Timesheet> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    deviceInfoService: DeviceInfoService,
    protected dataSubject: UserTimesheetSubject,
    arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,  
  ){
    super(arrayHelperService, localStorageService, 'UserTimesheetTimestamp',
      notificationService, apiService, dataSubject, deviceInfoService, "/UserTimesheets");
  }

  getByWeekGrouped$(dateParams: DateParams): Observable<Timesheet[][]>{
    return this.dataSubject.getByWeekGrouped$(dateParams);
  }

  getByWeekRangeGrouped$(startWeek: number, endWeek: number, year: number, excludeStatus?: TimesheetStatus): Observable<TimesheetSummary[]>{
    return this.dataSubject.getByWeekRangeGrouped$(startWeek, endWeek, year,  excludeStatus);
  }

  getByWithMission$(expression: (value: Timesheet, index?: number, Array?: any[]) => boolean): Observable<Timesheet[]>{
    return this.dataSubject.getByWithMission$(expression);
  }

  getWithMission$(id: number): Observable<Timesheet>{
    return this.dataSubject.getWithMission$(id);
  }

  getCount$(status: TimesheetStatus = undefined): Observable<number>{
    return this.dataSubject.getCount$(status);
  }

  deleteRange$(): Observable<boolean>{throw new Error("Method not implemented.")}
 
}
