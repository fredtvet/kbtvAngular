import { StateMissions } from '@core/state/global-state.interfaces';
import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';

export class UpdateLastVisitedAction extends StateAction { 
    constructor(public id: string){ super() }; 
}

export const UpdateLastVisitedReducer: Reducer<StateMissions, UpdateLastVisitedAction> = {
    action: UpdateLastVisitedAction,
    stateProperties: ["missions"],
    noDeepCloneState: true,
    reducerFn: (state: StateMissions, action: UpdateLastVisitedAction): StateMissions => {
        const index = state.missions?.findIndex(x => x.id === action.id);
        if(!index || state.missions) return null;
        let mission = state.missions[index];
        if(!index || !mission) return null;
        mission = {...mission, lastVisited: new Date().getTime()};
        return state;
    }
}