import { StateMissions, StateUsers, StateTimesheets } from 'src/app/core/state';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {
        timesheetAdminCriteria: TimesheetCriteria,
        timesheetAdminGroupBy: GroupByPeriod
     }