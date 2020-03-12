import { Duration } from '../interfaces/duration.interface';
import { BaseEntity } from '../interfaces/base-entity.interface';
import { TimesheetStatus } from '../enums/timesheet-status.enum';
import { Mission } from './mission.model';

export class Timesheet implements BaseEntity, Duration {

    constructor(
      public id: number = null,
      public userName: string = null,
      public missionId: number = null,
      public status: TimesheetStatus = TimesheetStatus.Open,
      public startTime: Date = null,
      public endTime: Date = null,
      public totalHours: number = null,
    ){ };

    public mission: Mission = null;

}
