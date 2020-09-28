export function _getWeekOfYear(date: Date | string | number = new Date()): number {
    var d = new Date(+date);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d.getTime() - new Date(d.getFullYear(),0,1).getTime())/8.64e7)+1)/7);
}