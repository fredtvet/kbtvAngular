import { MissionChild } from './relationships/mission-child.interface';
import { TimesheetStatus } from '@shared/enums';
import { UserForeign } from './relationships/user-foreign.interface';
import { User } from './user.interface';
import { IId } from './sub-interfaces/iid.interface';


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