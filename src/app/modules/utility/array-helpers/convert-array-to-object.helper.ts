import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _convertArrayToObject<T>(
  array: ImmutableArray<T>, 
  key?: string | ( (entity: Immutable<T>) => string )
): { [key: string]: Immutable<T> } {
    if(!array?.length) return {};
    const result = {}; 
    let setter: (entity: Immutable<T>, result: Object) => void;

    if(!key) 
      setter = (entity: Immutable<T>, result: Object) => result[entity as any] = entity
    else if(typeof key === "string")
      setter = (entity: Immutable<T>, result: Object) => result[entity[key]] = entity
    else if(typeof key === "function")
      setter = (entity: Immutable<T>, result: Object) => result[key(entity)] = entity

    for(var i = 0; i < array.length; i++) setter(array[i], result);

    return result;
}