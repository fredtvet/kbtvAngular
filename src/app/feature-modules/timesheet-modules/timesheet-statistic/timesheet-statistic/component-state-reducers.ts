import { GroupByPeriod } from '@shared/enums';
import { Reducer, StateAction } from '@state/interfaces';
import { StoreState } from '../store-state';

export const SetGroupByActionId = "SET_GROUP_BY";

export interface SetGroupByCommand extends StateAction { groupBy: GroupByPeriod }

export const SetGroupByReducer: Reducer<any, SetGroupByCommand> = {
    actionId: SetGroupByActionId,
    reducerFn: (state: StoreState, action: SetGroupByCommand) => {
        return { timesheetGroupBy: action.groupBy }
    }       
}  