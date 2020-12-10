import { StateMissions } from '@core/state/global-state.interfaces';
import { Reducer, StateAction } from '@state/interfaces';

export interface UpdateLastVisitedCommand extends StateAction { id: string; }

export const UpdateLastVisitedActionId = "MISSION_LIST_UPDATE_LAST_VISITED";

export const UpdateLastVisitedReducer: Reducer<StateMissions, UpdateLastVisitedCommand> = {
    actionId: UpdateLastVisitedActionId,
    stateProperties: ["missions"],
    noDeepCloneState: true,
    reducerFn: (state: StateMissions, action: UpdateLastVisitedCommand): StateMissions => {
        const index = state.missions?.findIndex(x => x.id === action.id);
        if(!index || state.missions) return null;
        let mission = state.missions[index];
        if(!index || !mission) return null;
        mission = {...mission, lastVisited: new Date().getTime()};
        return state;
    }
}