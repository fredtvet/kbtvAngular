export function _getLastDayOfMonth(date: Date | string = new Date()): Date  {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}