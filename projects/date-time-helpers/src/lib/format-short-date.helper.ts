import { DateInput, Immutable } from 'global-types';

export function _formatShortDate(d: Immutable<DateInput>): string{
    const date = new Date(d as Date);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear().toString().slice(2,4);
}