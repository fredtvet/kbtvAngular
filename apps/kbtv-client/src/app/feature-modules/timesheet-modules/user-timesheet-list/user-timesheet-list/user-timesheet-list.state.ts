import { Provider } from '@angular/core';
import { SetTimesheetCriteriaReducer } from '@shared-timesheet/state/set-timesheet-criteria.reducer';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { StateManagementModule } from 'state-management';
import { UserTimesheetListFacade } from './user-timesheet-list.facade';

export interface UserTimesheetListState { 
    timesheetCriteria: TimesheetCriteria,
}

export const UserTimesheetListProviders: Provider[] = [
    UserTimesheetListFacade,
    ...StateManagementModule.forComponent({ reducers: [SetTimesheetCriteriaReducer]}),
]