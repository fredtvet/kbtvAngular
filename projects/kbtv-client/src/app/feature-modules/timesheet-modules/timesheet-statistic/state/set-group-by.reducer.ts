import { GroupByPeriod } from '@shared/enums';
import { Immutable } from 'global-types';
import { StateAction, _createReducer } from 'state-management';
import { StoreState } from './store-state';

export const SetGroupByAction = "SET_GROUP_BY_ACTION";
export interface SetGroupByAction extends StateAction {
    groupBy: GroupByPeriod
}

export const SetGroupByReducer = _createReducer(
    SetGroupByAction,
    (state: StoreState, action: Immutable<SetGroupByAction>) => {
        return { timesheetStatisticGroupBy: action.groupBy }
    }  
)