import { Immutable, ImmutableArray, Maybe } from 'global-types';

export function _add<T>(array: Maybe<ImmutableArray<T>>, value: Immutable<T>): Immutable<T>[]{
    if(!array?.length) return [];
    let arr = array.slice();
    arr.unshift(value);
    return arr;
}