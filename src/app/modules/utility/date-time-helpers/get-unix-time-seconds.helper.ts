import { Immutable } from '@immutable/interfaces';

export function _getUnixTimeSeconds(date: Immutable<Date> | string | number = new Date()){
    return Math.floor(new Date(date as Date).getTime() / 1000)
}