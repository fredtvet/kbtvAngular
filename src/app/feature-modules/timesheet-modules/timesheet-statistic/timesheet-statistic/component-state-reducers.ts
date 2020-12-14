import { GroupByPeriod } from '@shared/enums';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';
import { ComponentStoreState } from '../store-state';

export class SetGroupByAction extends StateAction { 
    constructor(public groupBy: GroupByPeriod){ super() } 
}

export const SetGroupByReducer= _createReducer(
    SetGroupByAction,
    (state: ComponentStoreState, action: Immutable<SetGroupByAction>) => {
        return { timesheetGroupBy: action.groupBy }
    }, false  
)