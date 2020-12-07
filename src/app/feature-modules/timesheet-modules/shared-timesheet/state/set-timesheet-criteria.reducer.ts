import { StateAction, Reducer } from '@state/interfaces';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';

export const SetTimesheetCriteriaActionId = "SET_TIMESHEET_CRITERIA";

export interface SetTimesheetCriteriaCommand extends StateAction { timesheetCriteria: TimesheetCriteria }

export const SetTimesheetCriteriaReducer: Reducer<any> = {
    actionId: SetTimesheetCriteriaActionId,
    reducerFn: (state: {timesheetCriteria: TimesheetCriteria}, action: SetTimesheetCriteriaCommand) => {
        return { timesheetCriteria: action.timesheetCriteria }
    }       
}  