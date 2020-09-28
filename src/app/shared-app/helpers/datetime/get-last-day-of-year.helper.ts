export function _getLastDayOfYear(date: Date | string | number = new Date()): Date {
    return new Date(new Date(date).getFullYear(), 11, 31, 23, 59, 59);
}