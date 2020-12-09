import { StateUsers, StateMissions, StateTimesheets } from '@core/state/global-state.interfaces';
import { GroupByPeriod } from '@shared/enums';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets{}

export interface ComponentStoreState {
    timesheetCriteria: TimesheetCriteria,
    timesheetGroupBy: GroupByPeriod
}