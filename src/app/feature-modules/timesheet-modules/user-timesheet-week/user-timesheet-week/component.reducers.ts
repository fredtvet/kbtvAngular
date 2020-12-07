import { StoreState } from '@core/services/auth/interfaces/store-state';
import { _getWeeksInYear } from '@shared-app/helpers/datetime/get-weeks-in-year.helper';
import { StateAction, Reducer } from '@state/interfaces';
import { WeekCriteria } from '../../shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '../../shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { ComponentStoreState } from '../store-state.interface';

export const SetTimesheetCriteriaActionId = "SET_TIMESHEET_CRITERIA";

export interface SetTimesheetCriteriaCommand extends StateAction { weekCriteria: WeekCriteria }

export const SetTimesheetCriteriaReducer: Reducer<any> = {
    actionId: SetTimesheetCriteriaActionId,
    reducerFn: (state: StoreState, action: SetTimesheetCriteriaCommand) => {
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(action.weekCriteria),
            weekCriteria: action.weekCriteria
        }
    }       
} 

export const NextWeekActionId = "NEXT_WEEK";
export interface NextWeekCommand extends StateAction { currYear: number, currWeekNr: number }

export const NextWeekReducer: Reducer<any> = {
    actionId: NextWeekActionId,
    stateProperties: ["weekCriteria"], //Ingen state trengs
    reducerFn: (state: ComponentStoreState, action: NextWeekCommand) => {
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

export const PreviousWeekActionId = "PREVIOUS_WEEK";

export const PreviousWeekReducer: Reducer<any> = {
    actionId: PreviousWeekActionId,
    stateProperties: ["weekCriteria"], //Ingen state trengs
    reducerFn: (state: ComponentStoreState, action: StateAction) => {
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