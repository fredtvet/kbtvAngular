import { Immutable } from 'global-types';
import { DateRange } from './interfaces';

/**
 * Formats a range of dates to a readable format
 * @param range The range of dates to format
 * @param formatFn Formats the individual dates
 * @returns A string representation of the date range. 
 */
export function _formatDateRange(range: Immutable<DateRange>, formatFn: (d: unknown) => string): string {
    return formatFn(range.start) + " ~ " + formatFn(range.end)
}