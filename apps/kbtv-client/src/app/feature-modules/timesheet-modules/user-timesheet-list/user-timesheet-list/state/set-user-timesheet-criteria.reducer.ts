import { DateRangePresets } from "@shared-app/enums/date-range-presets.enum";
import { _getRangeByDateRangePreset } from "@shared-app/helpers/get-range-by-date-range-preset.helper";
import { TimesheetCriteria } from "@shared-timesheet/timesheet-filter/timesheet-criteria.interface";
import { DateRange } from "date-time-helpers";
import { DateInput } from "global-types";
import { StateAction, _createReducer } from "state-management";
import { UserTimesheetListState } from "./user-timesheet-list.state";

export const SetUserTimesheetCriteriaAction = "SET_USER_TIMESHEET_CRITERIA_ACTION";
export interface SetUserTimesheetCriteriaAction extends StateAction<typeof SetUserTimesheetCriteriaAction> {
    timesheetCriteria: Partial<TimesheetCriteria>;
    lowerBound: DateInput
}

export const SetUserTimesheetCriteriaReducer = _createReducer<UserTimesheetListState, SetUserTimesheetCriteriaAction>(
    SetUserTimesheetCriteriaAction,
    (state, action) => { 
        let {dateRangePreset, dateRange, ...rest} = {...action.timesheetCriteria}

        if(dateRangePreset && dateRangePreset !== DateRangePresets.Custom && dateRangePreset !== DateRangePresets.CustomMonth )
            dateRange = <DateRange> _getRangeByDateRangePreset(dateRangePreset, undefined, <DateInput> action.lowerBound);

        return { timesheetCriteria: <TimesheetCriteria> {dateRangePreset, dateRange, ...rest} }
    }
)