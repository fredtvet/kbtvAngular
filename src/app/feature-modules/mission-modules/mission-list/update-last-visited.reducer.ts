import { StateMissions } from '@core/state/global-state.interfaces';
import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';

export class UpdateLastVisitedAction extends StateAction { 
    constructor(public id: string){ super() }; 
}

export const UpdateLastVisitedReducer: Reducer<StateMissions, UpdateLastVisitedAction> = {
    action: UpdateLastVisitedAction,
    stateProperties: ["missions"], noDeepCloneState: true,
    reducerFn: (state: StateMissions, action: UpdateLastVisitedAction): StateMissions => {
        const index = state.missions?.findIndex(x => x.id === action.id);
        if(!index) return;

        const missions = [...state.missions];
        let mission = missions[index];
        if(!mission) return;

        missions[index] = {...mission, lastVisited: new Date().getTime()};
        return {missions};
    }
}