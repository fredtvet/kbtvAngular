import { StateTimesheets } from "@core/state/global-state.interfaces";
import { Immutable } from "global-types";
import { StateAction, _createReducer } from "state-management";
import { StateFetchedModels } from "state-model";

export const  TimesheetsClearAction = "CLEAR_TIMESHEETS_ACTION";
export interface  TimesheetsClearAction extends StateAction {}

export const TimesheetsClearReducer = _createReducer(
    TimesheetsClearAction, 
    (state: Immutable<StateTimesheets & StateFetchedModels<StateTimesheets>>) => {
        return {timesheets: [], fetchedModels: {...state.fetchedModels, timesheets: false}}
    }
)