import { Timesheet } from '../models';

export interface TimesheetSummary{   
    totalHours: number;
    timesheets: Timesheet[];
    openHours?: number;
    confirmedHours?: number;
    userName?: string;
    year?: number;
    month?: number;
    week?: number;
    day?: string;
}