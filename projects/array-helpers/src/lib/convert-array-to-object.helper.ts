import { Immutable, ImmutableArray, Maybe, Prop} from 'global-types';

type Response<T> = { [key: string]: Maybe<Immutable<T>> }
/**
 * Convert an array to a key/value object
 * @param array 
 * @param key An item property or function used as key in the object. If null, the value is used as key.
 * @returns An object containing keys with accociated values
 */
export function _convertArrayToObject<T>(
  array: Maybe<ImmutableArray<T>>, 
  key?: Prop<Immutable<T>> | ((t: Immutable<T>) => string)  
): Response<T> {
    if(!array?.length) return {};
    const result: Response<T> = {}; 
    
    let setter: (entity: Immutable<T>, result: Response<T>) => void = 
      (entity: Immutable<T>, result: Response<T>) => result[entity as unknown as string] = entity;

    if(typeof key === "string")
      setter = (entity: Immutable<T>, result: Response<T>) => result[<string> entity[key]] = entity
    else if(typeof key === "function")
      setter = (entity: Immutable<T>, result: Response<T>) => result[key(entity)] = entity

    for(var i = 0; i < array.length; i++) setter(array[i], result);

    return result;
}