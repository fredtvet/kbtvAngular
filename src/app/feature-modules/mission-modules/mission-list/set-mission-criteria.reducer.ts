import { StoreState } from '@core/services/auth/interfaces/store-state';
import { MissionCriteria } from '@shared/interfaces';
import { Reducer, StateAction } from '@state/interfaces';

export const SetMissionCriteriaActionId = "SET_MISSION_CRITERIA";

export interface SetMissionCriteriaCommand extends StateAction { missionCriteria: MissionCriteria }

export const SetMissionCriteriaReducer: Reducer<any, SetMissionCriteriaCommand> = {
    actionId: SetMissionCriteriaActionId,
    reducerFn: (state: StoreState, action: SetMissionCriteriaCommand) => {
        return { missionCriteria: action.missionCriteria }
    }       
}  
