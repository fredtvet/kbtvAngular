import { Timesheet } from '../models';

export interface TimesheetSummary{   
    timesheets: Timesheet[];
    openHours: number;
    confirmedHours: number;
    userName?: string;
    fullName?: string;
    year?: number;
    month?: number;
    week?: number;
    day?: string;
}