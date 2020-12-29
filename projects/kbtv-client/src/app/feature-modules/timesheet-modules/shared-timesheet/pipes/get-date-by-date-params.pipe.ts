import { Pipe, PipeTransform } from '@angular/core';
import { DateParams } from '@shared-app/interfaces';
import { _getDateOfWeek, _getFirstDayOfWeek } from 'date-time-helpers';
import { Immutable, Maybe } from 'global-types';

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
