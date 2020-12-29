import { GroupByPeriod } from '@shared/enums';
import { Immutable } from 'global-types';
import { StateAction, _createReducer } from 'state-management';
import { ComponentStoreState } from '../store-state';

export const SetGroupByAction = "SET_GROUP_BY_ACTION";
export interface SetGroupByAction extends StateAction {
    groupBy: GroupByPeriod
}

export const SetGroupByReducer = _createReducer(
    SetGroupByAction,
    (state: ComponentStoreState, action: Immutable<SetGroupByAction>) => {
        return { timesheetGroupBy: action.groupBy }
    }  
)