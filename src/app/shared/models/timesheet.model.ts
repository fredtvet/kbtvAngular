import * as moment from 'moment';
import { BaseEntity, Duration } from '../interfaces';
import { TimesheetStatus } from '../timesheet-status.enum';
import { TimesheetWeek } from './timesheet-week.model';

export class Timesheet implements BaseEntity, Duration {
    constructor(
      public id: number = null,
      public userName: string = null,
      public missionId: number = null,
      public timesheetWeekId: number = null,
      public timesheetWeek: TimesheetWeek = null,
      public startTime: Date = null,
      public endTime: Date = null,
      public status: TimesheetStatus = TimesheetStatus.Open,
    ){};
  };
