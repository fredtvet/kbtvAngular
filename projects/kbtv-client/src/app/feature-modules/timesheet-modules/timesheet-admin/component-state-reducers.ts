import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from 'global-types';
import { StateAction } from '@state/state.action';
import { WeekCriteria } from '../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { ComponentStoreState } from './store-state';

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction extends StateAction {
    weekCriteria: WeekCriteria
}

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaAction,
    (state: ComponentStoreState, action: Immutable<SetTimesheetCriteriaAction>): Partial<ComponentStoreState> => {
        const weekCriteria = {...action.weekCriteria, weekNr: undefined}
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(weekCriteria),
            weekCriteria
        }
    }     
) 

export const SetSelectedWeekAction = "SET_SELECTED_WEEK_ACTION";
export interface SetSelectedWeekAction extends StateAction {
    weekNr: number
}

export const SetSelectedWeekReducer = _createReducer(
    SetSelectedWeekAction,
    (state: ComponentStoreState, action: Immutable<SetSelectedWeekAction>) => {
        return {selectedWeekNr: action.weekNr}
    }   
)