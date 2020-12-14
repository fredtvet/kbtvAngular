import { Immutable } from '@immutable/interfaces';

export function _mergeDateAndTime(date: Immutable<Date> | string | number, time: Immutable<Date> | string | number): Immutable<Date>{
    const d = new Date(date as Date);
    const t = new Date(time as Date);
    d.setHours(t.getHours(), t.getMinutes(), t.getSeconds());
    return d;
}