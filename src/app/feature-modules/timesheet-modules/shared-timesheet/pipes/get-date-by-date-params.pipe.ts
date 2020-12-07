import { Pipe, PipeTransform } from '@angular/core';
import { _getDateOfWeek } from '@shared-app/helpers/datetime/get-date-of-week.helper';
import { _getFirstDayOfWeek } from '@shared-app/helpers/datetime/get-first-day-of-week.helper';
import { DateParams } from '@shared-app/interfaces';

@Pipe({
  name: 'getDateByDateParams'
})
export class GetDateByDateParamsPipe implements PipeTransform {
  constructor(){}

  transform(dp: DateParams, weekDayOverride: number): Date {
    if(!dp || Object.keys(dp).length === 0) return new Date();
    let date = _getFirstDayOfWeek(_getDateOfWeek(dp.weekNr, dp.year));
    if(weekDayOverride || dp.weekDay)
      date.setDate(date.getDate() + (weekDayOverride - 1) || dp.weekDay);

    return date;
  }

}
