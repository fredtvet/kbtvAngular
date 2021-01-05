import { User } from '@core/models';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { DateRange, _getDateOfWeek, _getWeekRange, _getYearRange } from 'date-time-helpers';
import { Immutable } from 'global-types';
import { WeekCriteria } from '../interfaces/week-criteria.interface';
import { TimesheetCriteria } from './timesheet-criteria.interface';

export class WeekToTimesheetCriteriaAdapter implements TimesheetCriteria {
    
    user?: Immutable<User>;
    dateRange?: DateRange; 
    dateRangePreset?: DateRangePresets = DateRangePresets.Custom;

    constructor(input: Immutable<WeekCriteria>){
        if(!input) return;

        this.user = input.user;

        if(input.weekNr && input.year) 
            this.dateRange = <DateRange> _getWeekRange(_getDateOfWeek(input.weekNr, input.year));

        else if(input.year){
            let date = new Date();
            date.setFullYear(input.year);
            this.dateRange = <DateRange> _getYearRange(date);
        }
    }


}