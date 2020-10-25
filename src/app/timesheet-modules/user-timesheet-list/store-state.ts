import { StateUserTimesheets, StateMissions } from 'src/app/core/services/state/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';
import { TimesheetCriteria, WeekCriteria } from '../shared-timesheet/interfaces';

export interface StoreState extends 
    StateUserTimesheets,
    StateMissions {
        userTimesheetListCriteria: TimesheetCriteria,
        userTimesheetListWeekCriteria: WeekCriteria,
        userTimesheetListGroupBy: GroupByPeriod,
}