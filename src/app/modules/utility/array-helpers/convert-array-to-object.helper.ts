import { Immutable, ImmutableArray } from '@immutable/interfaces';

type Response<T> = { [key: string]: Immutable<T> }
export function _convertArrayToObject<T>(
  array: ImmutableArray<T>, 
  key?: string | ( (entity: Immutable<T>) => string )
): Response<T> {
    if(!array?.length) return {};
    const result: Response<T> = {}; 
    let setter: (entity: Immutable<T>, result: Response<T>) => void;

    if(!key) 
      setter = (entity: Immutable<T>, result: Response<T>) => result[entity as unknown as string] = entity
    else if(typeof key === "string")
      setter = (entity: Immutable<T>, result: Response<T>) => result[entity[key]] = entity
    else if(typeof key === "function")
      setter = (entity: Immutable<T>, result: Response<T>) => result[key(entity)] = entity

    for(var i = 0; i < array.length; i++) setter(array[i], result);

    return result;
}