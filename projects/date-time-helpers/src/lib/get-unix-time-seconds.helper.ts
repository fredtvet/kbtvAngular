import { DateInput, Immutable } from 'global-types';

export function _getUnixTimeSeconds(date: Immutable<DateInput> = new Date()){
    return Math.floor(new Date(date as Date).getTime() / 1000)
}