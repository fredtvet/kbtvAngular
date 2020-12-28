import { Immutable } from 'global-types';

export function _getFirstDayOfWeek(date: Immutable<Date> = new Date()): Date  {
    let day = date.getDay();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (day == 0 ? -6 : 1) - day
    );
  }