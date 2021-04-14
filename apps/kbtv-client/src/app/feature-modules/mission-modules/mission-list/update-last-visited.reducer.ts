import { UpdateLastVisitedAction } from '@actions/mission-actions';
import { StateMissions } from '@core/state/global-state.interfaces';
import { Immutable } from 'global-types';
import { _createReducer } from 'state-management';

export const UpdateLastVisitedReducer = _createReducer(
    UpdateLastVisitedAction,
    (state: Immutable<StateMissions>, action: Immutable<UpdateLastVisitedAction>) => {
        if(!state.missions) return;

        const index = state.missions.findIndex(x => x.id === action.id);
        if(index === -1) return;

        const missions = [...state.missions];
        const mission = missions[index];
        if(!mission) return;

        missions[index] = {...mission, lastVisited: new Date().getTime()};
        return {missions};
    }
)