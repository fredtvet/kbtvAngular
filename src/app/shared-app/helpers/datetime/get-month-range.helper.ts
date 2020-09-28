import { _getFirstDayOfMonth } from './get-first-day-of-month.helper';
import { _getLastDayOfMonth } from './get-last-day-of-month.helper';

export function _getMonthRange(date: Date = new Date()): Date[] {
    var range = [];
    range.push(_getFirstDayOfMonth(date));
    range.push(_getLastDayOfMonth(date));
    return range;
}