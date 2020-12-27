import { DateRange } from './interfaces';;
import { _getFirstDayOfMonth } from './get-first-day-of-month.helper';
import { _getLastDayOfMonth } from './get-last-day-of-month.helper';
import { DateInput, Immutable } from '@global/interfaces';

export function _getMonthRange(date: Immutable<DateInput> = new Date(), getISO?: boolean): Immutable<DateRange> {
    const start = _getFirstDayOfMonth(date);   
    const end = _getLastDayOfMonth(date);
    return {
      start: getISO ? start.toISOString() : start, 
      end: getISO ? end.toISOString() : end
    };
}