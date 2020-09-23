import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeService } from 'src/app/core/services/utility/date-time.service';
import { DateParams } from 'src/app/shared-app/interfaces';

@Pipe({
  name: 'getDateByDateParams'
})
export class GetDateByDateParamsPipe implements PipeTransform {
  constructor(private dateTimeService: DateTimeService){}

  transform(dateParams: DateParams, weekDayOverride: number): Date {
    if(!dateParams || Object.keys(dateParams).length === 0) return new Date();
    
    let date = this.dateTimeService.getWeekRangeByDateParams(dateParams)[0];

    if(weekDayOverride || dateParams.weekDay)
      date.setDate(date.getDate() + (weekDayOverride - 1) || dateParams.weekDay);

    return date;
  }

}
