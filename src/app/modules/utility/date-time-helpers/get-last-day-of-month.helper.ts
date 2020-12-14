import { Immutable } from '@immutable/interfaces';

export function _getLastDayOfMonth(date: Immutable<Date> | string | number = new Date()): Immutable<Date>  {
    const d = new Date(date as Date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}