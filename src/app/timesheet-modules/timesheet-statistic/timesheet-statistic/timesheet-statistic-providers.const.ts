import { Provider } from '@angular/core';
import { ComponentStoreProviders } from 'src/app/state/providers.const';
import { STORE_DEFAULT_STATE, STORE_REDUCERS } from 'src/app/state/injection-tokens';
import { SetTimesheetCriteriaReducer } from '../../shared-timesheet/state/set-timesheet-criteria.reducer';
import { TimesheetStatisticFacade } from '../timesheet-statistic.facade';
import { SetGroupByReducer } from './component-state-reducers';
import { DefaultComponentState } from './default-state.const';

export const TimesheetStatisticProviders: Provider[] = [
    TimesheetStatisticFacade,
    ...ComponentStoreProviders,
    {provide: STORE_DEFAULT_STATE, useValue: DefaultComponentState},
    {provide: STORE_REDUCERS, useValue: SetTimesheetCriteriaReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: SetGroupByReducer, multi: true}
  ]