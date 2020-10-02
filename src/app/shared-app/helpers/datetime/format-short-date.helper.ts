export function _formatShortDate(d: Date | string | number): string{
    if(!d) return;
    const date = new Date(d);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear().toString().slice(2,4);
}