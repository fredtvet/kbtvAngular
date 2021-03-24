import { Immutable } from "global-types";
import { StateAction, _createReducer } from "state-management";
import { StoreState } from "../store-state";

export const SetSelectedWeekAction = "SET_SELECTED_WEEK_ACTION";
export interface SetSelectedWeekAction extends StateAction {
    weekNr: number
}

export const SetSelectedWeekReducer = _createReducer(
    SetSelectedWeekAction,
    (state: StoreState, action: Immutable<SetSelectedWeekAction>) => {
        return {timesheetAdminSelectedWeekNr: action.weekNr}
    }   
)