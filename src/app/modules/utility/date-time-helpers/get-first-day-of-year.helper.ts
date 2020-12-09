export function _getFirstDayOfYear(date: Date | string | number = new Date()): Date  {
    return new Date(new Date(date).getFullYear(), 0, 1);
}