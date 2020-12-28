import { Pipe, PipeTransform } from '@angular/core';
import { _getDateOfWeek } from '@datetime/get-date-of-week.helper';
import { _getFirstDayOfWeek } from '@datetime/get-first-day-of-week.helper';
import { Immutable, Maybe } from 'global-types';
import { DateParams } from '@shared-app/interfaces';

@Pipe({name: 'getDateByDateParams'})
export class GetDateByDateParamsPipe implements PipeTransform {
  constructor(){}

  transform(dp: Maybe<DateParams>, weekDayOverride: number): Immutable<Date> {
    if(!dp || !dp.weekNr) return new Date();
    let date = _getFirstDayOfWeek(_getDateOfWeek(dp.weekNr, dp.year || new Date().getFullYear()));
    if(weekDayOverride || dp.weekDay)
      date.setDate(date.getDate() + (weekDayOverride - 1) || dp.weekDay || 0);

    return date;
  }

}
