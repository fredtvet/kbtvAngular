
import { StateUsers, StateMissions, StateTimesheets } from 'src/app/core/services/state/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';
import { TimesheetCriteria, WeekCriteria } from '../shared-timesheet/interfaces';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {
        timesheetAdminCriteria: TimesheetCriteria,
        timesheetAdminGroupBy: GroupByPeriod,
        timesheetAdminWeekCriteria: WeekCriteria
     }