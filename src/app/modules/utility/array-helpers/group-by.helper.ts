import { ImmutableArray, Immutable } from '@immutable/interfaces';

export function _groupBy<T>(array: ImmutableArray<T>, key: string): {[key: string] : Immutable<T>[]}{
    if(!array?.length) return {};
    const result = {}; 
    for(var i = 0; i < array.length; i++){
      const entity = array[i];
      (result[entity[key]] = result[entity[key]] || []).push(entity);
    }
    return result
}