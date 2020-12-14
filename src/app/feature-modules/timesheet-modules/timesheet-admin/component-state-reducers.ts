import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';
import { WeekCriteria } from '../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { ComponentStoreState } from './store-state';

export class SetTimesheetCriteriaAction extends StateAction {
    constructor(public weekCriteria: WeekCriteria){ super() } 
}

export const SetTimesheetCriteriaReducer= _createReducer(
    SetTimesheetCriteriaAction,
    (state: ComponentStoreState, action: Immutable<SetTimesheetCriteriaAction>): Partial<ComponentStoreState> => {
        const weekCriteria = {...action.weekCriteria, weekNr: undefined}
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(weekCriteria),
            weekCriteria
        }
    }, false     
) 

export class SetSelectedWeekAction extends StateAction { 
    constructor(public weekNr: number){ super() } 
}

export const SetSelectedWeekReducer= _createReducer(
    SetSelectedWeekAction,
    (state: ComponentStoreState, action: SetSelectedWeekAction) => {
        return {selectedWeekNr: action.weekNr}
    }, false   
)