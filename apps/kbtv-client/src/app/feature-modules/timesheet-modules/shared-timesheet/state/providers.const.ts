import { Provider } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { FetchTimesheetsHttpEffect } from './fetch-timesheets.http.effect';
import { SaveUserTimesheetReducer } from './save-user-timesheet/save-user-timesheet.reducer';
import { SetFetchedTimesheetsReducer } from './set-fetched-timesheets.reducer';
import { SetCriteriaCacheRedcuer } from './set-criteria-cache.reducer';

export const SaveUserTimesheetProviders: Provider[] = [
    {provide: STORE_REDUCERS, useValue: SaveUserTimesheetReducer, multi: true},
]

export const FetchTimesheetProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: FetchTimesheetsHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SetFetchedTimesheetsReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: SetCriteriaCacheRedcuer, multi: true}
]