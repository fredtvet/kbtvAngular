import { SetSelectedWeekAction } from "@actions/timesheet-actions";
import { Immutable } from "global-types";
import { _createReducer } from "state-management";
import { StoreState } from "../store-state";

export const SetSelectedWeekReducer = _createReducer(
    SetSelectedWeekAction,
    (state: StoreState, action: Immutable<SetSelectedWeekAction>) => {
        return {timesheetAdminSelectedWeekNr: action.weekNr}
    }   
)