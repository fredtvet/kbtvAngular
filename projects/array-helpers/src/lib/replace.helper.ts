import { ImmutableArray, Immutable, Maybe, Prop } from 'global-types';

/**
 * Replace an object in an array objects with a new value
 * @param array An array of objects
 * @param obj The new object
 * @param id A unique value identifying the object being replaced
 * @param identifier A property on the object that contains the unique value
 */
export function _replace<T>(
  array: Maybe<ImmutableArray<T>>, 
  obj: Immutable<T>, 
  id: unknown, 
  identifier: Prop<Immutable<T>>): Immutable<T>[]{
    if(!array?.length) return [];
    let arr = array.slice();
    for(let i = 0; i < arr.length; i++){
      let currObj = arr[i];
      if(currObj[identifier] === id){
        arr[i] = obj;
        break;
      }
    }
    return arr;
}