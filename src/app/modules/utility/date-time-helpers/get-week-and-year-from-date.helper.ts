import { DateInput, Immutable } from '@global/interfaces';

export function _getWeekAndYearFromDate(date: Immutable<DateInput> = new Date()): {weekNr: number, year: number} {
    var d = new Date(date as Date);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    let year = d.getFullYear();
    let weekNr = Math.ceil((((d.getTime() - new Date(year,0,1).getTime())/8.64e7)+1)/7);
    return {weekNr, year}
}