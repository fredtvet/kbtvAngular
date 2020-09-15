import { StateUserTimesheets, StateMissions } from 'src/app/core/state';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { GroupByPeriod } from 'src/app/shared-app/enums';

export interface StoreState extends 
    StateUserTimesheets,
    StateMissions {
        userTimesheetListCriteria: TimesheetCriteria,
        userTimesheetListGroupBy: GroupByPeriod,
}