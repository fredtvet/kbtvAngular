import { DateRange } from './interfaces';;
import { _getFirstDayOfWeek } from './get-first-day-of-week.helper';
import { _getLastDayOfWeek } from './get-last-day-of-week.helper';
import { Immutable } from 'global-types';

export function _getWeekRange(date: Immutable<Date> = new Date(), getISO?: boolean): Immutable<DateRange> {
    const start = _getFirstDayOfWeek(date);   
    const end = _getLastDayOfWeek(date);
    return {
      start: getISO ? start.toISOString() : start, 
      end: getISO ? end.toISOString() : end
    };
}