import { User } from '../core/models';
import { DateRangePresets } from '../shared-app/enums';
import { _getDateOfWeek } from '../shared-app/helpers/datetime/get-date-of-week.helper';
import { _getWeekRange } from '../shared-app/helpers/datetime/get-week-range.helper';
import { _getYearRange } from '../shared-app/helpers/datetime/get-year-range.helper';
import { WeekCriteria } from './components/week-filter-view/week-filter-view-config.interface';
import { TimesheetCriteria } from './interfaces/timesheet-criteria.interface';

export class WeekToTimesheetCriteriaAdapter implements TimesheetCriteria {
    
    user?: User;
    dateRange?: Date[]; 
    dateRangePreset?: DateRangePresets = DateRangePresets.Custom;

    constructor(input: WeekCriteria){
        if(!input) return;

        this.user = input.user;

        if(input.weekNr && input.year) 
            this.dateRange = _getWeekRange(_getDateOfWeek(input.weekNr, input.year));

        else if(input.year){
            let date = new Date();
            date.setFullYear(input.year);
            this.dateRange = _getYearRange(date);
        }
    }


}