import { Timesheet } from '../models';

export interface TimesheetSummary{   
    totalHours: number;
    timesheets: Timesheet[];
    userName?: string;
    year?: number;
    month?: number;
    week?: number;
    day?: string;
}