import { MissionChild } from './relationships/mission-child.interface';
import { UserForeign } from './relationships/user-foreign.interface';
import { User } from './user.interface';
import { IId } from './sub-interfaces/iid.interface';
import { TimesheetStatus } from '@shared-app/enums/timesheet-status.enum';


export interface Timesheet extends MissionChild, UserForeign, IId {
    userName?: string;
    user?: User;
    fullName?: string;

    status?: TimesheetStatus;
    comment?: string;
    
    startTime?: number;
    endTime?: number;
    totalHours?: number;
}

export interface UserTimesheet extends Omit<Timesheet, "user" | "userName" | "fullName"> {  }