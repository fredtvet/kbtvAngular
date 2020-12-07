import { Provider } from '@angular/core';
import { _getWeekOfYear } from '@shared-app/helpers/datetime/get-week-of-year.helper';
import { STORE_DEFAULT_STATE, STORE_REDUCERS } from '@state/injection-tokens';
import { ComponentStoreProviders } from '@state/providers.const';
import { WeekCriteria } from '../../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { ComponentStoreState } from '../store-state.interface';
import { NextWeekReducer, PreviousWeekReducer, SetTimesheetCriteriaReducer } from './component.reducers';
import { UserTimesheetWeekFacade } from './user-timesheet-week.facade';

const DefaultWeekCriteria: WeekCriteria= {
    year: new Date().getFullYear(), 
    weekNr: _getWeekOfYear(),
}

const DefaultComponentState: Partial<ComponentStoreState> = {
    weekCriteria: DefaultWeekCriteria,
    timesheetCriteria: new WeekToTimesheetCriteriaAdapter(DefaultWeekCriteria)
}

export const UserTimesheetWeekProviders: Provider[] = [
    ...ComponentStoreProviders,
    UserTimesheetWeekFacade,
    { provide: STORE_REDUCERS, useValue: SetTimesheetCriteriaReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: NextWeekReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: PreviousWeekReducer, multi: true },
    { provide: STORE_DEFAULT_STATE, useValue: DefaultComponentState }

]
