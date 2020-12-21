import { DateInput, Immutable } from '@global/interfaces';

export function _getISO(date: Immutable<DateInput>): string{
    return new Date(date as Date).toISOString()
}