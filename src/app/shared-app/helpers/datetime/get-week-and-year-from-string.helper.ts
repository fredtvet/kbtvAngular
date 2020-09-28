export function _getWeekAndYearFromString(date: Date | string = this.currentDate): {week: number, year: number} {
    var d = new Date(date);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    let year = d.getFullYear();
    let week = Math.ceil((((d.getTime() - new Date(year,0,1).getTime())/8.64e7)+1)/7);
    return {week, year}
}