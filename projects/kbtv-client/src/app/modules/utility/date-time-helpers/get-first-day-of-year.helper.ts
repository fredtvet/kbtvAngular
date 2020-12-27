import { DateInput, Immutable } from '@global/interfaces';

export function _getFirstDayOfYear(date: Immutable<DateInput> = new Date()): Immutable<Date>  {
    return new Date(new Date(date as Date).getFullYear(), 0, 1);
}