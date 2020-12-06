import { Provider } from '@angular/core';
import { ComponentStoreProviders } from 'src/app/state/providers.const';
import { STORE_REDUCERS } from 'src/app/state/injection-tokens';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { UserTimesheetListFacade } from './user-timesheet-list.facade';
import { SetTimesheetCriteriaReducer } from '../../shared-timesheet/state/set-timesheet-criteria.reducer';

export interface UserTimesheetListState { 
    timesheetCriteria: TimesheetCriteria,
}

export const UserTimesheetListProviders: Provider[] = [
    UserTimesheetListFacade,
    ...ComponentStoreProviders,
    {provide: STORE_REDUCERS, useValue: SetTimesheetCriteriaReducer, multi: true},
]