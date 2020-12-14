import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _add<T>(array: ImmutableArray<T>, value: Immutable<T>): Immutable<T>[]{
    if(!array?.length) return [];
    let arr = array.slice();
    arr.unshift(value);
    return arr;
}