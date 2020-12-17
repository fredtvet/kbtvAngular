import { DateInput, Immutable } from '@global/interfaces';

export function _getISOWithTimezone(date?: Immutable<DateInput>): string{
    const _date = date ? new Date(date as Date) : new Date();
    const timezone = _date.getTimezoneOffset();

    if(timezone == 0) return _date.toISOString();
    const hours = Math.abs(timezone / 60); //Convert to hours
    const newDate = new Date(_date); 

    newDate.setHours(_date.getHours() + hours, 0,0,0);

    let result: string = newDate.toISOString();
    const isoSuffix = `${timezone > 0 ? "-" : "+"}${hours > 9 ? "" : "0"}${hours}:00`;

    result = result.substring(0, result.length - 1) + isoSuffix;
    
    return result;
  }

export function _getISO(date?: Immutable<DateInput>): string{
    return (date ? new Date(date as Date) : new Date()).toISOString()
}