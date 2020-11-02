
import { StateUsers, StateMissions, StateTimesheets } from 'src/app/core/services/state/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';
import { WeekCriteria } from '../shared-timesheet/interfaces';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {
        timesheetAdminCriteria: TimesheetCriteria,
        timesheetAdminGroupBy: GroupByPeriod,
        timesheetAdminWeekCriteria: WeekCriteria
     }