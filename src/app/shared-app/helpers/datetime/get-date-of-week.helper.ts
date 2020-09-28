export function _getDateOfWeek(weekNr: number, year: number) {
    var d = (1 + (weekNr - 1) * 7); // 1st of January + 7 days for each week
    return new Date(year, 0, d);
}