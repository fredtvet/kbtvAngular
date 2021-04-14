import { StateTimesheets } from "@core/state/global-state.interfaces";
import { TimesheetCriteria } from "@shared-timesheet/timesheet-filter/timesheet-criteria.interface";
import { StateIsFetching } from "model-state";

export interface StateSharedTimesheet extends StateTimesheets, StateIsFetching<StateTimesheets> {
    timesheetCriteriaCache: TimesheetCriteria[];
}