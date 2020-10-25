import { DateRange } from 'src/app/shared/interfaces/date-range.interface';

export function _formatDateRange(range:DateRange, formatFn: (d: any) => string): string{
    if(!range) return;
    return formatFn(range.start) + " ~ " + formatFn(range.end)
}