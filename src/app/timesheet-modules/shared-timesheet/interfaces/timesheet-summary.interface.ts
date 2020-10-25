import { Timesheet } from 'src/app/core/models';

export interface TimesheetSummary{   
    timesheets: Timesheet[];
    openHours: number;
    confirmedHours: number;
    userName?: string;
    fullName?: string;
    year?: number;
    month?: number;
    weekNr?: number;
    date?: Date;
}