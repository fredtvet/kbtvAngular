import { StoreState } from '@core/services/auth/interfaces/store-state';
import { _getWeeksInYear } from '@datetime/get-weeks-in-year.helper';
import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { WeekCriteria } from '../../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { ComponentStoreState } from '../store-state.interface';

export class SetTimesheetCriteriaAction extends StateAction { 
    constructor(public weekCriteria: WeekCriteria){ super() } 
}

export const SetTimesheetCriteriaReducer: Reducer<any, SetTimesheetCriteriaAction> = {
    action: SetTimesheetCriteriaAction,
    reducerFn: (state: StoreState, action: SetTimesheetCriteriaAction) => {
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(action.weekCriteria),
            weekCriteria: action.weekCriteria
        }
    }       
} 

export class NextWeekAction extends StateAction { 
    constructor(
        public currYear: number, 
        public currWeekNr: number 
    ){ super() }    
}

export const NextWeekReducer: Reducer<any, NextWeekAction> = {
    action: NextWeekAction,
    stateProperties: ["weekCriteria"], //Ingen state trengs
    reducerFn: (state: ComponentStoreState, action: NextWeekAction) => {
        const {currYear, currWeekNr} = action; 
        if(state.weekCriteria.year >= currYear &&state. weekCriteria.weekNr >= currWeekNr) return;
    
        if(state.weekCriteria.weekNr >= _getWeeksInYear(state.weekCriteria.year)){   
            state.weekCriteria.year++; //New year if week nr is over total weeks for year
            state.weekCriteria.weekNr = 1; //Start of new year     
        }
        else state.weekCriteria.weekNr++;
      
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(state.weekCriteria),
            weekCriteria: state.weekCriteria
        }
    }       
}  

export class PreviousWeekAction extends StateAction { }

export const PreviousWeekReducer: Reducer<any, PreviousWeekAction> = {
    action: PreviousWeekAction,
    stateProperties: ["weekCriteria"], //Ingen state trengs
    reducerFn: (state: ComponentStoreState, action: PreviousWeekAction) => {
        const {weekCriteria} = state;
        
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
}  