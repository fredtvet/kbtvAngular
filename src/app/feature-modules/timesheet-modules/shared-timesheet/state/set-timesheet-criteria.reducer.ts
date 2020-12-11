import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';

export class SetTimesheetCriteriaAction extends StateAction { 
    constructor(public timesheetCriteria: TimesheetCriteria){ super() } 
}

export const SetTimesheetCriteriaReducer: Reducer<any, SetTimesheetCriteriaAction> = {
    action: SetTimesheetCriteriaAction,
    reducerFn: (state: any, action: SetTimesheetCriteriaAction) => {
        return { timesheetCriteria: action.timesheetCriteria }
    }       
}  