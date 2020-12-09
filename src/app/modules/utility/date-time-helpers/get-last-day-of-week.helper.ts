export function _getLastDayOfWeek(date: Date = new Date()): Date  {
    let day = date.getDay();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (day == 0 ? 0 : 7) - day,
      23,59,59
    );
 }