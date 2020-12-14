import { Immutable } from '@immutable/interfaces';
import { TimesheetSummary, WeekCriteria } from '../../shared-timesheet/interfaces';

export interface ViewModel{ 
    weekDaySummaries: {[key: number]: Immutable<TimesheetSummary>}, 
    weekCriteria: Immutable<WeekCriteria>, 
    isXs: boolean
}