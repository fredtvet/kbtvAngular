import { _getFirstDayOfWeek } from './get-first-day-of-week.helper';
import { _getLastDayOfWeek } from './get-last-day-of-week.helper';

export function _getWeekRange(date: Date = new Date()): Date[] {
    var range = [];
    range.push(_getFirstDayOfWeek(date));
    range.push(_getLastDayOfWeek(date));
    return range;
}