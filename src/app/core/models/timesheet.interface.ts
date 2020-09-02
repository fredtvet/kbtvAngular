import { MissionChild } from './mission-child.interface';
import { TimesheetStatus } from 'src/app/shared-app/enums';


export interface Timesheet extends MissionChild {
    userName?: string;
    fullName?: string;

    status?: TimesheetStatus;
    comment?: string;
    
    startTime?: string;
    endTime?: string;
    totalHours?: number;
}
