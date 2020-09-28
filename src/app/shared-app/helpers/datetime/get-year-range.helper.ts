import { _getFirstDayOfYear } from './get-first-day-of-year.helper';
import { _getLastDayOfYear } from './get-last-day-of-year.helper';

export function _getYearRange(date: Date = new Date()): Date[] {
    var range = [];
    range.push(_getFirstDayOfYear(date));
    range.push(_getLastDayOfYear(date));
    return range;
}