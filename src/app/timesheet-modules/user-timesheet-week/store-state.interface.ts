import { StateMissions, StateUserTimesheets } from 'src/app/state/interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';

export interface StoreState extends StateUserTimesheets, StateMissions {}

export interface ComponentStoreState { 
    timesheetCriteria: TimesheetCriteria,
    weekCriteria: WeekCriteria,
}
