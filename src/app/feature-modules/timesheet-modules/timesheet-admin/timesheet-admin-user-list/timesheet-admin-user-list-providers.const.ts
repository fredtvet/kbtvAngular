import { Provider } from '@angular/core';
import { ComponentStoreProviders } from '@state/providers.const';
import { STORE_REDUCERS } from "@state/injection-tokens";
import { SetTimesheetCriteriaReducer, SetSelectedWeekReducer } from "../component-state-reducers";
import { TimesheetAdminFacade } from "../timesheet-admin.facade";

export const TimesheetAdminUserListProviders: Provider[] = [
    TimesheetAdminFacade,
    ...ComponentStoreProviders,
    {provide: STORE_REDUCERS, useValue: SetTimesheetCriteriaReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: SetSelectedWeekReducer, multi: true}
]