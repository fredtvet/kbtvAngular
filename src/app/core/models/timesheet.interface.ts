
import { BaseEntity } from './base-entity.interface';
import { MissionChild } from './mission-child.interface';
import { TimesheetStatus } from 'src/app/shared-app/enums';


export interface Timesheet extends BaseEntity, MissionChild {
    userName: string;
    fullName?: string;

    status: TimesheetStatus;
    comment: string;
    
    startTime: Date;
    endTime: Date;
    totalHours: number;
}
