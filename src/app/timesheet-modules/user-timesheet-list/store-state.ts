import { StateUserTimesheets, StateMissions } from 'src/app/core/services/state/interfaces';
import { TimesheetCriteria, WeekCriteria } from 'src/app/shared-timesheet/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';

export interface StoreState extends 
    StateUserTimesheets,
    StateMissions {
        userTimesheetListCriteria: TimesheetCriteria,
        userTimesheetListWeekCriteria: WeekCriteria,
        userTimesheetListGroupBy: GroupByPeriod,
}