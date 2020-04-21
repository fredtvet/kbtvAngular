import { Timesheet } from '../models';

export interface TimesheetSummary{
    userName: string;
    totalHours: number;
    timesheets: Timesheet[];
    year?: number;
    month?: number;
    week?: number;
    day?: string;
}