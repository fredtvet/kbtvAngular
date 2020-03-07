import { BaseEntity } from '../interfaces';
import { TimesheetStatus } from '../timesheet-status.enum';
import { Timesheet } from './timesheet.model';

export class TimesheetWeek implements BaseEntity {
    constructor(
      public id: number = null,
      public userName: string = null,
      public year: number = null,
      public weekNr: number = null,
      public status: TimesheetStatus = TimesheetStatus.Open,
      public timesheets: Timesheet[][] = []
    ){};
  };
