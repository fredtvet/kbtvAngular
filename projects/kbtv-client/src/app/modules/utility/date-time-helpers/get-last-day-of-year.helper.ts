import { DateInput, Immutable } from '@global/interfaces';

export function _getLastDayOfYear(date: Immutable<DateInput> = new Date()): Immutable<Date> {
    return new Date(new Date(date as Date).getFullYear(), 11, 31, 23, 59, 59);
}