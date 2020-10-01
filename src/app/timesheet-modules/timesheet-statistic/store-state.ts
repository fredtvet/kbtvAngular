
import { GroupByPeriod } from 'src/app/shared/enums';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { StateUsers, StateMissions, StateTimesheets } from 'src/app/core/services/state/interfaces';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets{
        timesheetStatisticCriteria: TimesheetCriteria,
        timesheetStatisticGroupBy: GroupByPeriod
    }