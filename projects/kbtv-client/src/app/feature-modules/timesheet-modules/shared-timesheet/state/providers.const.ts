import { Provider } from '@angular/core';
import { saveModelMetaReducer } from '@core/state/save-model.meta.reducer';
import { STORE_EFFECTS, STORE_META_REDUCERS, STORE_REDUCERS } from 'state-management'
import { FetchTimesheetsHttpEffect } from './fetch-timesheets.http.effect';
import { SaveUserTimesheetHttpEffect } from './save-user-timesheet/save-user-timesheet.http.effect';
import { SaveUserTimesheetReducer } from './save-user-timesheet/save-user-timesheet.reducer';
import { SetFetchedTimesheetsReducer } from './set-fetched-timesheets.reducer';

export const SaveUserTimesheetProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveUserTimesheetHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveUserTimesheetReducer, multi: true},
    {provide: STORE_META_REDUCERS, useValue: saveModelMetaReducer, multi: true}
]

export const FetchTimesheetProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: FetchTimesheetsHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SetFetchedTimesheetsReducer, multi: true}
]