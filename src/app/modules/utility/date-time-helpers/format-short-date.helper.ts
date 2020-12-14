import { Immutable } from '@immutable/interfaces';

export function _formatShortDate(d: Immutable<Date> | string | number): string{
    if(!d) return;
    const date = new Date(d as Date);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear().toString().slice(2,4);
}