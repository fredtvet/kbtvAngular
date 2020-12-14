import { GroupByPeriod } from '@shared/enums';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';
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