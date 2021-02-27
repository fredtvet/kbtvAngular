import { TimesheetCriteria } from "@shared-timesheet/timesheet-filter/timesheet-criteria.interface";
import { Immutable } from "global-types";
import { StateAction, _createReducer } from "state-management";
import { StateSharedTimesheet } from "./state-shared-timesheet.interface";

export const  SetCriteriaCacheAction = "SET_CRITERIA_CACHE_ACTION";
export interface  SetCriteriaCacheAction extends StateAction { criteria: TimesheetCriteria }

export const SetCriteriaCacheRedcuer = _createReducer(
    SetCriteriaCacheAction, 
    (state: Immutable<StateSharedTimesheet>, action: Immutable<SetCriteriaCacheAction>) => {
        return {
            isFetching: {...state.isFetching, timesheets: true},
            timesheetCriteriaCache: [action.criteria, ...state.timesheetCriteriaCache || []]
        }
    }
)