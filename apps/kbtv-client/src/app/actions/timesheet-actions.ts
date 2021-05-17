import { Timesheet } from "@core/models";
import { WeekCriteria } from "@shared-timesheet/interfaces";
import { TimesheetCriteria } from "@shared-timesheet/timesheet-filter/timesheet-criteria.interface";
import { GroupByPeriod, TimesheetStatus } from "@shared/enums";
import { Immutable, Prop, UnknownState } from "global-types";
import { StateAction } from "state-management";

export const FetchTimesheetsAction = "FETCH_TIMESHEETS_ACTION";
export interface FetchTimesheetsAction extends StateAction<typeof FetchTimesheetsAction> {
    timesheetCriteria: TimesheetCriteria
}

export const  SetCriteriaCacheAction = "SET_CRITERIA_CACHE_ACTION";
export interface  SetCriteriaCacheAction extends StateAction<typeof  SetCriteriaCacheAction> { criteria: TimesheetCriteria }

export const SetFetchedTimesheetsAction = "SET_FETCHED_TIMESHEETS_ACTION";
export interface SetFetchedTimesheetsAction extends StateAction<typeof SetFetchedTimesheetsAction> {
    timesheets: Timesheet[]
}

export const SetTimesheetCriteriaWithWeekCriteriaAction = "SET_TIMESHEET_CRITERIA_WITH_WEEK_CRITERIA_ACTION";
export interface SetTimesheetCriteriaWithWeekCriteriaAction extends StateAction<typeof SetTimesheetCriteriaWithWeekCriteriaAction> {
    weekCriteria: WeekCriteria
}

export const SetSelectedWeekAction = "SET_SELECTED_WEEK_ACTION";
export interface SetSelectedWeekAction extends StateAction<typeof SetSelectedWeekAction> {
    weekNr: number
}

export const UpdateTimesheetStatusesAction = "UPDATE_TIMESHEET_STATUSES_ACTION";
export interface UpdateTimesheetStatusesAction extends StateAction<typeof UpdateTimesheetStatusesAction>{
    ids: string[],
    status: TimesheetStatus,
    type: typeof UpdateTimesheetStatusesAction
}

export const SetGroupByAction = "SET_GROUP_BY_ACTION";
export interface SetGroupByAction extends StateAction<typeof SetGroupByAction> {
    groupBy: GroupByPeriod
}

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction<TState = UnknownState> extends StateAction<typeof SetTimesheetCriteriaAction> {
    timesheetCriteria: Immutable<TimesheetCriteria>,
    criteriaProp: Prop<TState>
}