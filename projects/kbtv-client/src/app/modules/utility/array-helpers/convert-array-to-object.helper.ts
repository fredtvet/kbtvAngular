import { Immutable, ImmutableArray, Maybe } from '@global/interfaces';
import { Prop } from '@state/interfaces';

type Response<T> = { [key: string]: Maybe<Immutable<T>> }
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