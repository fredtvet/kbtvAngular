import { MissionCriteria } from '@shared/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateAction } from '@state/state.action';
import { ComponentStoreState } from './interfaces/store-state';

export const SetMissionCriteriaAction = "SET_MISSION_CRITERIA_ACTION";
export interface SetMissionCriteriaAction extends StateAction {
    missionCriteria: MissionCriteria
}

export const SetMissionCriteriaReducer= _createReducer(
    SetMissionCriteriaAction,
    (state: ComponentStoreState, action: SetMissionCriteriaAction) => {
        return { missionCriteria: action.missionCriteria }
    }       
)  
