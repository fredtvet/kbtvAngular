import { MissionCriteria } from '@shared/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateAction } from '@state/state.action';
import { ComponentStoreState } from './interfaces/store-state';

export class SetMissionCriteriaAction extends StateAction { 
    constructor(public missionCriteria: MissionCriteria){ super() } 
}

export const SetMissionCriteriaReducer= _createReducer(
    SetMissionCriteriaAction,
    (state: ComponentStoreState, action: SetMissionCriteriaAction) => {
        return { missionCriteria: action.missionCriteria }
    }       
)  
