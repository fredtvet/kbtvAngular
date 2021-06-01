import { _createReducer } from 'state-management';
import { SetGroupByAction } from './actions.const';
import { StoreState } from './store-state';

export const SetGroupByReducer = _createReducer<StoreState, SetGroupByAction>(
    SetGroupByAction,
    (state, action) => {
        return { timesheetStatisticGroupBy: action.groupBy }
    }  
)