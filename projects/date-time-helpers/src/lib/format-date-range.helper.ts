import { Immutable } from 'global-types';
import { DateRange } from './interfaces';

export function _formatDateRange(range: Immutable<DateRange>, formatFn: (d: unknown) => string): string {
    return formatFn(range.start) + " ~ " + formatFn(range.end)
}