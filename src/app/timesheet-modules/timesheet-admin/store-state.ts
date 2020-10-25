
import { StateUsers, StateMissions, StateTimesheets } from 'src/app/core/services/state/interfaces';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { WeekCriteria } from 'src/app/shared-timesheet/interfaces/week-criteria.interface';
import { GroupByPeriod } from 'src/app/shared/enums';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {
        timesheetAdminCriteria: TimesheetCriteria,
        timesheetAdminGroupBy: GroupByPeriod,
        timesheetAdminWeekCriteria: WeekCriteria
     }