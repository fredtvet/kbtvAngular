import { Injectable } from '@angular/core';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { Converter } from '../../interfaces/converter.interface';
import { DateTimeService } from './date-time.service';
import { WeekCriteria } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-config.interface';
import { DateRangePresets } from 'src/app/shared-app/enums/date-range-presets.enum';

@Injectable({providedIn: "root"})
export class WeekToTimesheetCriteriaConverter implements Converter<WeekCriteria, TimesheetCriteria>{

    constructor(private dateTimeService: DateTimeService){}

    convert(input: WeekCriteria): TimesheetCriteria {
        if(!input) return;
        
        const result: TimesheetCriteria = {
            userName: input.userName,
            dateRangePreset: DateRangePresets.Custom
        };

        if(input?.weekNr) 
            result.dateRange = 
                this.dateTimeService.getWeekRange(this.dateTimeService.getDateOfWeek(input.weekNr, input.year));
        else if(input?.year){
            let date = new Date();
            date.setFullYear(input.year);
            result.dateRange = this.dateTimeService.getYearRange(date);
        }

        return result;    
    }


}