import { DateRange } from './interfaces';;
import { _getFirstDayOfMonth } from './get-first-day-of-month.helper';
import { _getLastDayOfMonth } from './get-last-day-of-month.helper';

export function _getMonthRange(date: Date | string | number = new Date(), getISO?: boolean): DateRange {
    const start = _getFirstDayOfMonth(date);   
    const end = _getLastDayOfMonth(date);
    return {
      start: getISO ? start.toISOString() : start, 
      end: getISO ? end.toISOString() : end
    };
}