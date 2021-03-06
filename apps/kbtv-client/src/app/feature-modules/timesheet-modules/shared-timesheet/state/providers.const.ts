import { Provider } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { FetchTimesheetsHttpEffect } from './effects';
import { SetFetchedTimesheetsReducer, SetCriteriaCacheRedcuer } from './reducers.const';

export const FetchTimesheetProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: FetchTimesheetsHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SetFetchedTimesheetsReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: SetCriteriaCacheRedcuer, multi: true}
]