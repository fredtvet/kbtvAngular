import { Reducer, StateAction } from '@state/interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { StoreState } from './store-state';

export const SetTimesheetCriteriaActionId = "SET_TIMESHEET_CRITERIA";

export interface SetTimesheetCriteriaCommand extends StateAction { weekCriteria: WeekCriteria }

export const SetTimesheetCriteriaReducer: Reducer<any, SetTimesheetCriteriaCommand> = {
    actionId: SetTimesheetCriteriaActionId,
    reducerFn: (state: StoreState, action: SetTimesheetCriteriaCommand) => {
        delete action.weekCriteria.weekNr;
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(action.weekCriteria),
            weekCriteria: action.weekCriteria
        }
    }       
}  

export const SetSelectedWeekActionId = "SET_SELECTED_WEEK";

export interface SetSelectedWeekCommand extends StateAction { weekNr: number }

export const SetSelectedWeekReducer: Reducer<any, SetSelectedWeekCommand> = {
    actionId: SetSelectedWeekActionId,
    reducerFn: (state: StoreState, action: SetSelectedWeekCommand) => {
        return {selectedWeekNr: action.weekNr}
    }       
} 