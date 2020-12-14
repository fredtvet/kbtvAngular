import { Immutable } from '@immutable/interfaces';

export function _getFirstDayOfYear(date: Immutable<Date> | string | number = new Date()): Immutable<Date>  {
    return new Date(new Date(date as Date).getFullYear(), 0, 1);
}