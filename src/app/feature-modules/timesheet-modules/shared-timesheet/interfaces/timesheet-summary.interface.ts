import { Timesheet } from '@core/models';
import { UserForeign } from '@core/models/relationships/user-foreign.interface';
import { Immutable } from '@immutable/interfaces';

export interface TimesheetSummary extends UserForeign {   
    timesheets: Timesheet[];
    openHours: number;
    confirmedHours: number;
    year?: number;
    month?: number;
    weekNr?: number;
    date?: Date;
}