import { WeekCriteria } from "@shared-timesheet/interfaces";
import { WeekToTimesheetCriteriaAdapter } from "@shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter";
import { Immutable } from "global-types";
import { StateAction, _createReducer } from "state-management";
import { StoreState } from "../store-state";

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction extends StateAction {
    weekCriteria: WeekCriteria
}

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaAction,
    (state: StoreState, action: Immutable<SetTimesheetCriteriaAction>): Partial<StoreState> => {
        const weekCriteria = {...action.weekCriteria, weekNr: undefined}
        return {
            timesheetAdminTimesheetCriteria: new WeekToTimesheetCriteriaAdapter(weekCriteria),
            timesheetAdminWeekCriteria: weekCriteria
        }
    }     
) 