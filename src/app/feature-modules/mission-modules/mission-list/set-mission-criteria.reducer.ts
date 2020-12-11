import { StoreState } from '@core/services/auth/interfaces/store-state';
import { MissionCriteria } from '@shared/interfaces';
import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';

export class SetMissionCriteriaAction extends StateAction { 
    constructor(public missionCriteria: MissionCriteria){ super() } 
}

export const SetMissionCriteriaReducer: Reducer<any, SetMissionCriteriaAction> = {
    action: SetMissionCriteriaAction,
    reducerFn: (state: StoreState, action: SetMissionCriteriaAction) => {
        return { missionCriteria: action.missionCriteria }
    }       
}  
