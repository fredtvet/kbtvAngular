import { Provider } from '@angular/core';
import { _getWeekYear } from 'date-time-helpers';
import { StateManagementModule } from 'state-management';
import { WeekCriteria } from '../../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { ComponentStoreState } from '../store-state.interface';
import { NextWeekReducer, PreviousWeekReducer, SetTimesheetCriteriaReducer } from './component.reducers';
import { UserTimesheetWeekFacade } from './user-timesheet-week.facade';

const DefaultWeekCriteria: WeekCriteria = {..._getWeekYear()}

const DefaultComponentState: Partial<ComponentStoreState> = {
    weekCriteria: DefaultWeekCriteria,
    timesheetCriteria: new WeekToTimesheetCriteriaAdapter(DefaultWeekCriteria)
}

export const UserTimesheetWeekProviders: Provider[] = [
    ...StateManagementModule.forComponent({ 
        reducers: [SetTimesheetCriteriaReducer, NextWeekReducer, PreviousWeekReducer],
        defaultState: DefaultComponentState
    }),
    UserTimesheetWeekFacade,
]
