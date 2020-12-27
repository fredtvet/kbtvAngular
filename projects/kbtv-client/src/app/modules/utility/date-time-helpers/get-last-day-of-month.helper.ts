import { DateInput, Immutable } from '@global/interfaces';

export function _getLastDayOfMonth(date: Immutable<DateInput> = new Date()): Immutable<Date>  {
    const d = new Date(date as Date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}