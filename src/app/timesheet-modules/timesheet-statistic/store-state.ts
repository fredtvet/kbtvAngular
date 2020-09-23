import { StateMissions, StateTimesheets, StateUsers } from 'src/app/core/state';
import { GroupByPeriod } from 'src/app/shared/enums';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets{
        timesheetStatisticCriteria: TimesheetCriteria,
        timesheetStatisticGroupBy: GroupByPeriod
    }