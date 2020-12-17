import { Immutable, Maybe } from '@global/interfaces';
import { TimesheetSummary, WeekCriteria } from '../../shared-timesheet/interfaces';

export interface ViewModel{ 
    weekDaySummaries: Maybe<{[key: number]: Immutable<TimesheetSummary>}>, 
    weekCriteria: Maybe<Immutable<WeekCriteria>>, 
    isXs: boolean
}