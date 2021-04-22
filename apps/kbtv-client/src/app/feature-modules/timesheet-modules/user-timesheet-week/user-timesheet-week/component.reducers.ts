import { WeekCriteria } from '@shared-timesheet/interfaces';
import { WeekToTimesheetCriteriaAdapter } from '@shared-timesheet/timesheet-filter/week-to-timesheet-criteria.adapter';
import { _getWeekYear, _getWeeksInYear } from 'date-time-helpers';
import { Immutable } from 'global-types';
import { StateAction, _createReducer } from 'state-management';
import { ComponentStoreState } from '../store-state.interface';

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction extends StateAction<typeof SetTimesheetCriteriaAction> {
    weekCriteria: WeekCriteria 
}

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaAction,
    (state: Immutable<ComponentStoreState>, action: Immutable<SetTimesheetCriteriaAction>) => {
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter(action.weekCriteria),
            weekCriteria: action.weekCriteria
        }
    }       
) 

export const NextWeekAction = "NEXT_WEEK_ACTION";
export interface NextWeekAction extends StateAction<typeof NextWeekAction> {
    currYear: number, 
    currWeekNr: number
}

export const NextWeekReducer = _createReducer(
    NextWeekAction,
    (state: Immutable<ComponentStoreState>, action: Immutable<NextWeekAction>) => {
        const {currYear, currWeekNr} = action; 
        let {year, weekNr} = {...state.weekCriteria}

        if(!year) year = currYear;
        if(!weekNr) weekNr = currWeekNr;

        if((year >= currYear) && (weekNr >= currWeekNr)) return; //If already current week, ignore 
    
        if(weekNr >= _getWeeksInYear(state.weekCriteria.year)){   
            year++; //New year if week nr is over total weeks for year
            weekNr = 1; //Start of new year     
        }
        else weekNr++;
      
        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter({year, weekNr}),
            weekCriteria: {year, weekNr}
        }
    }       
)  

export const PreviousWeekAction = "PREVIOUS_WEEK_ACTION";
export interface PreviousWeekAction extends StateAction<typeof PreviousWeekAction> { }

export const PreviousWeekReducer = _createReducer(
    PreviousWeekAction,
    (state: Immutable<ComponentStoreState>) => {
        let {weekNr, year} = {...state.weekCriteria};

        const wy = _getWeekYear();
        if(!year) year = wy.year;
        if(!weekNr) weekNr = wy.weekNr
        
        if(weekNr <= 1) {
            year--; //Go to previous year if new week is less than 1
            weekNr = _getWeeksInYear(year); //Set to max week in previous year
        }
        else weekNr--;  

        return {
            timesheetCriteria: new WeekToTimesheetCriteriaAdapter({year, weekNr}),
            weekCriteria: {year, weekNr}
        }
    }       
)  