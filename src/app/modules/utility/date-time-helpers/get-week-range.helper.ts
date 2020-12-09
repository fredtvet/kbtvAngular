import { DateRange } from './interfaces';;
import { _getFirstDayOfWeek } from './get-first-day-of-week.helper';
import { _getLastDayOfWeek } from './get-last-day-of-week.helper';

export function _getWeekRange(date: Date = new Date(), getISO?: boolean): DateRange {
    const start = _getFirstDayOfWeek(date);   
    const end = _getLastDayOfWeek(date);
    return {
      start: getISO ? start.toISOString() : start, 
      end: getISO ? end.toISOString() : end
    };
}