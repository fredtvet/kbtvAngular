import { Provider } from '@angular/core';
import { SetTimesheetCriteriaReducer } from '@shared-timesheet/state/set-timesheet-criteria.reducer';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { ComponentStoreProviders, STORE_REDUCERS } from 'state-management';
import { UserTimesheetListFacade } from './user-timesheet-list.facade';

export interface UserTimesheetListState { 
    timesheetCriteria: TimesheetCriteria,
}

export const UserTimesheetListProviders: Provider[] = [
    UserTimesheetListFacade,
    ...ComponentStoreProviders,
    {provide: STORE_REDUCERS, useValue: SetTimesheetCriteriaReducer, multi: true},
]