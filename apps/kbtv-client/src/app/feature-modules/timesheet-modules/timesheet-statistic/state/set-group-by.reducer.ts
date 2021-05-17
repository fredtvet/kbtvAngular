import { SetGroupByAction } from '@actions/timesheet-actions';
import { _createReducer } from 'state-management';
import { StoreState } from './store-state';

export const SetGroupByReducer = _createReducer<StoreState, SetGroupByAction>(
    SetGroupByAction,
    (state, action) => {
        return { timesheetStatisticGroupBy: action.groupBy }
    }  
)