import { Immutable } from '@immutable/interfaces';

export function _getLastDayOfYear(date: Immutable<Date> | string | number = new Date()): Immutable<Date> {
    return new Date(new Date(date as Date).getFullYear(), 11, 31, 23, 59, 59);
}