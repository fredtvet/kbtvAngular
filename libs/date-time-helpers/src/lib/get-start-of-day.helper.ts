import { DateInput, Immutable } from "global-types";

export function  _getStartOfDayTime(date: Immutable<DateInput>): number{
    const newDate = new Date(date as Date);
    newDate.setHours(0,0,0,0);
    return newDate.getTime();
}