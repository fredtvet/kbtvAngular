import { StateMissions, StateTimesheets, StateUsers } from '@core/state/global-state.interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {
        timesheetAdminTimesheetCriteria: TimesheetCriteria,
        timesheetAdminWeekCriteria: Omit<WeekCriteria, "weekNr" | "weekDay">
        timesheetAdminSelectedWeekNr: number;
    }
