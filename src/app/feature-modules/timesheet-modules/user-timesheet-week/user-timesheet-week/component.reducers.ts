import { _getWeeksInYear } from '@datetime/get-weeks-in-year.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';
import { WeekCriteria } from '../../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { ComponentStoreState } from '../store-state.interface';

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction extends StateAction {
    weekCriteria: WeekCriteria 
}

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaAction,
    (state: Immutable<ComponentStoreState>, action: SetTimesheetCriteriaAction) => {
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(action.weekCriteria),
            weekCriteria: action.weekCriteria
        }
    }       
) 

export const NextWeekAction = "NEXT_WEEK_ACTION";
export interface NextWeekAction extends StateAction {
    currYear: number, 
    currWeekNr: number
}

export const NextWeekReducer= _createReducer(
    NextWeekAction,
    (state: Immutable<ComponentStoreState>, action: Immutable<NextWeekAction>) => {
        const {currYear, currWeekNr} = action; 
        const weekCriteria = {...state.weekCriteria}
        if(weekCriteria.year >= currYear && weekCriteria.weekNr >= currWeekNr) return;
    
        if(weekCriteria.weekNr >= _getWeeksInYear(state.weekCriteria.year)){   
            weekCriteria.year++; //New year if week nr is over total weeks for year
            weekCriteria.weekNr = 1; //Start of new year     
        }
        else weekCriteria.weekNr++;
      
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(weekCriteria),
            weekCriteria
        }
    }, false       
)  

export const PreviousWeekAction = "PREVIOUS_WEEK_ACTION";
export interface PreviousWeekAction extends StateAction { }

export const PreviousWeekReducer= _createReducer(
    PreviousWeekAction,
    (state: Immutable<ComponentStoreState>, action: PreviousWeekAction) => {
        const weekCriteria = {...state.weekCriteria};
        
        if(weekCriteria.weekNr <= 1) {
            weekCriteria.year--; //Go to previous year if new week is less than 1
            weekCriteria.weekNr = _getWeeksInYear(weekCriteria.year); //Set to max week in previous year
        }
        else weekCriteria.weekNr--;  

        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(weekCriteria),
            weekCriteria
        }
    }       
)  