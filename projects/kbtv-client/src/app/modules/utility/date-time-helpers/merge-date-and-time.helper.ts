import { DateInput, Immutable } from '@global/interfaces';

export function _mergeDateAndTime(date: Immutable<DateInput> = new Date(), time: Immutable<DateInput>): Immutable<Date>{
    const d = new Date(date as Date);
    const t = new Date(time as Date);
    d.setHours(t.getHours(), t.getMinutes(), t.getSeconds());
    return d;
}