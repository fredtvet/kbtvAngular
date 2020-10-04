import { StateUserTimesheets, StateMissions } from 'src/app/core/services/state/interfaces';
import { WeekCriteria } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';

export interface StoreState extends 
    StateUserTimesheets,
    StateMissions {
        userTimesheetListCriteria: TimesheetCriteria,
        userTimesheetListWeekCriteria: WeekCriteria,
        userTimesheetListGroupBy: GroupByPeriod,
}