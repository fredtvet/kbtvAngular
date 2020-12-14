import { StateMissions } from '@core/state/global-state.interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';

export class UpdateLastVisitedAction extends StateAction { 
    constructor(public id: string){ super() }; 
}

export const UpdateLastVisitedReducer= _createReducer(
    UpdateLastVisitedAction,
    (state: Immutable<StateMissions>, action: Immutable<UpdateLastVisitedAction>): Immutable<StateMissions> => {
        const index = state.missions?.findIndex(x => x.id === action.id);
        if(!index) return;

        const missions = [...state.missions];
        let mission = missions[index];
        if(!mission) return;

        missions[index] = {...mission, lastVisited: new Date().getTime()};
        return {missions};
    }, false
)