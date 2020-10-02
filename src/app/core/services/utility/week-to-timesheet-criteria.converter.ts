import { Injectable } from '@angular/core';
import { DateRangePresets } from 'src/app/shared-app/enums/date-range-presets.enum';
import { _getDateOfWeek } from 'src/app/shared-app/helpers/datetime/get-date-of-week.helper';
import { _getWeekRange } from 'src/app/shared-app/helpers/datetime/get-week-range.helper';
import { _getYearRange } from 'src/app/shared-app/helpers/datetime/get-year-range.helper';
import { Converter } from 'src/app/shared-app/interfaces';
import { WeekCriteria } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';

@Injectable({providedIn: "root"})
export class WeekToTimesheetCriteriaConverter implements Converter<WeekCriteria, TimesheetCriteria>{

    constructor(){}

    convert(input: WeekCriteria): TimesheetCriteria {
        if(!input) return;
        
        const result: TimesheetCriteria = {
            user: input.user,
            dateRangePreset: DateRangePresets.Custom
        };

        if(input?.weekNr) 
            result.dateRange = _getWeekRange(_getDateOfWeek(input.weekNr, input.year));
        else if(input?.year){
            let date = new Date();
            date.setFullYear(input.year);
            result.dateRange = _getYearRange(date);
        }

        return result;    
    }


}