import { Timesheet } from "@core/models";
import { StateUserTimesheets } from "@core/state/global-state.interfaces";
import { WeekCriteria } from "@shared-timesheet/interfaces";
import { TimesheetCriteria } from "@shared-timesheet/timesheet-filter/timesheet-criteria.interface";
import { GroupByPeriod, TimesheetStatus } from "@shared/enums";
import { Immutable, Prop, UnknownState } from "global-types";
import { StateAction } from "state-management";
import { SaveModelAction } from "state-model";

export const FetchTimesheetsAction = "FETCH_TIMESHEETS_ACTION";
export interface FetchTimesheetsAction extends StateAction {
    timesheetCriteria: TimesheetCriteria
}

export const  SetCriteriaCacheAction = "SET_CRITERIA_CACHE_ACTION";
export interface  SetCriteriaCacheAction extends StateAction { criteria: TimesheetCriteria }

export const SetFetchedTimesheetsAction = "SET_FETCHED_TIMESHEETS_ACTION";
export interface SetFetchedTimesheetsAction extends StateAction {
    timesheets: Timesheet[]
}

export const SetSelectedWeekAction = "SET_SELECTED_WEEK_ACTION";
export interface SetSelectedWeekAction extends StateAction {
    weekNr: number
}

export const SetTimesheetCriteriaWithWeekCriteriaAction = "SET_TIMESHEET_CRITERIA_WITH_WEEK_CRITERIA_ACTION";
export interface SetTimesheetCriteriaWithWeekCriteriaAction extends StateAction {
    weekCriteria: WeekCriteria
}

export const UpdateTimesheetStatusesAction = "UPDATE_TIMESHEET_STATUSES_ACTION";
export interface UpdateTimesheetStatusesAction extends StateAction{
    ids: string[],
    status: TimesheetStatus
}

export const SetGroupByAction = "SET_GROUP_BY_ACTION";
export interface SetGroupByAction extends StateAction {
    groupBy: GroupByPeriod
}

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction<TState = UnknownState> extends StateAction {
    timesheetCriteria: Immutable<TimesheetCriteria>,
    criteriaProp: Prop<TState>
}

export const SaveUserTimesheetAction = SaveModelAction+"IMESHEET";
export interface SaveUserTimesheetAction extends SaveModelAction<Timesheet, StateUserTimesheets>{}