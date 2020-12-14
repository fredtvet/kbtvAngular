import { Immutable } from '@immutable/interfaces';

export function _getLastDayOfWeek(date: Immutable<Date> = new Date()): Immutable<Date>  {
    let day = date.getDay();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (day == 0 ? 0 : 7) - day,
      23,59,59
    );
 }