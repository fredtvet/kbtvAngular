import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { WeekCriteria } from '../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { StoreState } from './store-state';

export class SetTimesheetCriteriaAction extends StateAction {
    constructor(public weekCriteria: WeekCriteria){ super() } 
}

export const SetTimesheetCriteriaReducer: Reducer<any, SetTimesheetCriteriaAction> = {
    action: SetTimesheetCriteriaAction,
    reducerFn: (state: StoreState, action: SetTimesheetCriteriaAction) => {
        delete action.weekCriteria.weekNr;
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(action.weekCriteria),
            weekCriteria: action.weekCriteria
        }
    }       
}  

export class SetSelectedWeekAction extends StateAction { 
    constructor(public weekNr: number){ super() } 
}

export const SetSelectedWeekReducer: Reducer<any, SetSelectedWeekAction> = {
    action: SetSelectedWeekAction,
    reducerFn: (state: StoreState, action: SetSelectedWeekAction) => {
        return {selectedWeekNr: action.weekNr}
    }       
} 