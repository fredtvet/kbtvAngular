import { Immutable } from '@global/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateAction } from '@state/state.action';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction extends StateAction {
    timesheetCriteria: Immutable<TimesheetCriteria>
}

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaAction,
    (state: unknown, action: Immutable<SetTimesheetCriteriaAction>) => {
        return { timesheetCriteria: action.timesheetCriteria }
    }       
) 