import { MissionChild } from '../mission-child.interface';
import { TimesheetStatus } from '../../enums/timesheet-status.enum';
import { BaseEntity } from './base-entity.interface';


export interface Timesheet extends BaseEntity, MissionChild {
    userName: string;
    fullName?: string;

    status: TimesheetStatus;
    comment: string;
    
    startTime: Date;
    endTime: Date;
    totalHours: number;
}
