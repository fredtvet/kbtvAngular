import { Immutable } from '@immutable/interfaces';
import { DateRange } from './interfaces';

export function _formatDateRange(range: Immutable<DateRange>, formatFn: (d: any) => string): string{
    if(!range) return;
    return formatFn(range.start) + " ~ " + formatFn(range.end)
}