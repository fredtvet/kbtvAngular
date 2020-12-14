import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';

export class SetFetchedStateAction extends StateAction { 
    constructor(public state: Object){ super() } 
}

export const SetFetchedStateReducer = _createReducer(
    SetFetchedStateAction,
    (state: any, action: Immutable<SetFetchedStateAction>) => action.state,
    false
)