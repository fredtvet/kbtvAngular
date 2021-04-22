import { MissionCriteria } from '@shared/interfaces';
import { Immutable } from 'global-types';
import { StateAction, _createReducer } from 'state-management';
import { ComponentStoreState } from './interfaces/store-state';

export const SetMissionCriteriaAction = "SET_MISSION_CRITERIA_ACTION";
export interface SetMissionCriteriaAction extends StateAction<typeof SetMissionCriteriaAction> {
    missionCriteria: MissionCriteria
}

export const SetMissionCriteriaReducer = _createReducer(
    SetMissionCriteriaAction,
    (state: ComponentStoreState, action: Immutable<SetMissionCriteriaAction>) => {
        return { missionCriteria: action.missionCriteria }
    }       
)  
