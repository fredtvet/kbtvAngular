import { Timesheet } from 'src/app/core/models';
import { UserForeign } from 'src/app/core/models/relationships/user-foreign.interface';

export interface TimesheetSummary extends UserForeign {   
    timesheets: Timesheet[];
    openHours: number;
    confirmedHours: number;
    year?: number;
    month?: number;
    weekNr?: number;
    date?: Date;
}