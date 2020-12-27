import { StateUsers, StateMissions, StateTimesheets } from '@core/state/global-state.interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {}

export interface ComponentStoreState {
        timesheetCriteria: TimesheetCriteria,
        weekCriteria: Omit<WeekCriteria, "weekNr" | "weekDay">
        selectedWeekNr: number;
}