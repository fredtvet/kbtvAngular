import { SetTimesheetCriteriaWithWeekCriteriaAction } from "@actions/timesheet-actions";
import { WeekToTimesheetCriteriaAdapter } from "@shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter";
import { Immutable } from "global-types";
import { _createReducer } from "state-management";
import { StoreState } from "../store-state";

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaWithWeekCriteriaAction,
    (state: StoreState, action: Immutable<SetTimesheetCriteriaWithWeekCriteriaAction>): Partial<StoreState> => {
        const weekCriteria = {...action.weekCriteria, weekNr: undefined}
        return {
            timesheetAdminTimesheetCriteria: new WeekToTimesheetCriteriaAdapter(weekCriteria),
            timesheetAdminWeekCriteria: weekCriteria
        }
    }     
) 