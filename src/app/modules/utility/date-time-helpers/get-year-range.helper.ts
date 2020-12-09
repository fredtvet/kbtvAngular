import { DateRange } from './interfaces';;
import { _getFirstDayOfYear } from './get-first-day-of-year.helper';
import { _getLastDayOfYear } from './get-last-day-of-year.helper';

export function _getYearRange(date: Date = new Date(), getISO?: boolean): DateRange {
    const start = _getFirstDayOfYear(date);   
    const end = _getLastDayOfYear(date);
    return {
      start: getISO ? start.toISOString() : start, 
      end: getISO ? end.toISOString() : end
    };
}