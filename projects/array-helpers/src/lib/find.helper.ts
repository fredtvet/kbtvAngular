import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';

/**
 * Find an object in an array of objects
 * @param array An array of objects
 * @param value A unique value used to find the object
 * @param identifier A property on the object that contains the unique value
 */
export function _find<T>(
  array: Maybe<ImmutableArray<T>>, 
  value: unknown, 
  identifier: Prop<Immutable<T>>): Maybe<Immutable<T>> {
    if(!array?.length || !value) return;

    for(let i = 0; i < array.length; i++){
      const obj = array[i];
      if(obj[identifier] === value) return obj;   
    }
    return;
}