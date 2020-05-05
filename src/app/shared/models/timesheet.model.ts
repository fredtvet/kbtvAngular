import { Duration } from '../interfaces/duration.interface';
import { BaseEntity } from '../interfaces/base-entity.interface';
import { TimesheetStatus } from '../enums/timesheet-status.enum';
import { Mission } from './mission.model';
import { MissionChild } from '../interfaces/mission-child.interface';

export class Timesheet implements Duration, MissionChild {

    constructor(
      public id: number = null,
      public userName: string = null,
      public missionId: number = null,
      public status: TimesheetStatus = TimesheetStatus.Open,
      public startTime: Date = null,
      public endTime: Date = null,
      public comment: string = null,
      public totalHours: number = null,
    ){ };

    public mission: Mission = null;

    public fullName?: string = null;

}
