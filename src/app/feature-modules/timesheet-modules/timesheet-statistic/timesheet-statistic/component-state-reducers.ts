import { GroupByPeriod } from '@shared/enums';
import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { StoreState } from '../store-state';

export class SetGroupByAction extends StateAction { 
    constructor(public groupBy: GroupByPeriod){ super() } 
}

export const SetGroupByReducer: Reducer<any, SetGroupByAction> = {
    action: SetGroupByAction,
    reducerFn: (state: StoreState, action: SetGroupByAction) => {
        return { timesheetGroupBy: action.groupBy }
    }       
}  