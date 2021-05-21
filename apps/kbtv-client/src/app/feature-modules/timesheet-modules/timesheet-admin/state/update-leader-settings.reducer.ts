import { UpdateLeaderSettingsSuccessAction } from "@actions/timesheet-actions";
import { _createReducer } from "state-management";
import { StoreState } from "../store-state";

export const UpdateLeaderSettingsSuccessReducer = _createReducer<StoreState, UpdateLeaderSettingsSuccessAction>(
    UpdateLeaderSettingsSuccessAction,
    (state, action)=> { return { leaderSettings: {...state.leaderSettings, ...action.settings} } }     
) 