import { SetGroupByAction } from '@actions/timesheet-actions';
import { Immutable } from 'global-types';
import { _createReducer } from 'state-management';
import { StoreState } from './store-state';

export const SetGroupByReducer = _createReducer(
    SetGroupByAction,
    (state: StoreState, action: Immutable<SetGroupByAction>) => {
        return { timesheetStatisticGroupBy: action.groupBy }
    }  
)