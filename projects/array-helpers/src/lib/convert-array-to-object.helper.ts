import { Immutable, ImmutableArray, Maybe, Prop} from 'global-types';

type Response<T> = { [key: string]: Maybe<Immutable<T>> }
/**
 * Convert an array to a key/value object
 * @param array 
 * @param key If property on the array value that will be used as the key for its value. If null, the value is used as key.
 * @returns An object containing keys with accociated values
 */
export function _convertArrayToObject<T>(
  array: Maybe<ImmutableArray<T>>, 
  key?: Prop<Immutable<T>>   
): Response<T> {
    if(!array?.length) return {};
    const result: Response<T> = {}; 
    
    let setter: (entity: Immutable<T>, result: Response<T>) => void = 
      (entity: Immutable<T>, result: Response<T>) => result[entity as unknown as string] = entity;

    if(typeof key === "string")
      setter = (entity: Immutable<T>, result: Response<T>) => result[<string> entity[key]] = entity

    for(var i = 0; i < array.length; i++) setter(array[i], result);

    return result;
}