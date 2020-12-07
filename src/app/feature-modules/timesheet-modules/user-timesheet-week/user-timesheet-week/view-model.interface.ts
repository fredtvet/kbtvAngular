import { TimesheetSummary, WeekCriteria } from '../../shared-timesheet/interfaces';

export interface ViewModel{ 
    weekDaySummaries: {[key: number]: TimesheetSummary}, 
    weekCriteria: WeekCriteria, 
    isXs: boolean
}