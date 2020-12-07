
import { GroupByPeriod } from '@shared/enums';
import { StateUsers, StateMissions, StateTimesheets } from '@state/interfaces';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets{}

export interface ComponentStoreState {
    timesheetCriteria: TimesheetCriteria,
    timesheetGroupBy: GroupByPeriod
}