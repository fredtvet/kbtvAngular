import { Immutable } from '@immutable/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateAction } from '@state/state.action';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';

export class SetTimesheetCriteriaAction extends StateAction { 
    constructor(public timesheetCriteria: Immutable<TimesheetCriteria>){ super() } 
}

export const SetTimesheetCriteriaReducer= _createReducer(
    SetTimesheetCriteriaAction,
    (state: any, action: SetTimesheetCriteriaAction) => {
        return { timesheetCriteria: action.timesheetCriteria }
    }       
) 