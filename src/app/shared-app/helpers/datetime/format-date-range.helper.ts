export function _formatDateRange(range:any[], formatFn: (d: any) => string): string{
    if(range.length == 0) return;
    return formatFn(range[0]) + " ~ " + formatFn(range[1])
}