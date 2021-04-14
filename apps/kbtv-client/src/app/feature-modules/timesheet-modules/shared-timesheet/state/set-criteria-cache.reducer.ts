import { SetCriteriaCacheAction } from "@actions/timesheet-actions";
import { Immutable } from "global-types";
import { _createReducer } from "state-management";
import { StateSharedTimesheet } from "./state-shared-timesheet.interface";

export const SetCriteriaCacheRedcuer = _createReducer(
    SetCriteriaCacheAction, 
    (state: Immutable<StateSharedTimesheet>, action: Immutable<SetCriteriaCacheAction>) => {
        return {
            isFetching: {...state.isFetching, timesheets: true},
            timesheetCriteriaCache: [action.criteria, ...state.timesheetCriteriaCache || []]
        }
    }
)