import { StateMissions, StateUsers, StateTimesheets } from 'src/app/core/state';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { TimesheetCriteria } from 'src/app/shared/interfaces';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {
        timesheetAdminCriteria: TimesheetCriteria,
        timesheetAdminGroupBy: GroupByPeriod
     }