import { Immutable } from '@immutable/interfaces';
import { DateRange } from './interfaces';

export function _formatDateRange(range: Immutable<DateRange>, formatFn: (d: unknown) => string): string{
    if(!range) return;
    return formatFn(range.start) + " ~ " + formatFn(range.end)
}