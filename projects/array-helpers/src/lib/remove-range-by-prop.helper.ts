import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';
import { _convertArrayToObject } from './convert-array-to-object.helper';

/**
 * Remove a range  of objects from an array of objects based on a common property value
 * @param originals An array of objects
 * @param value The value or array of values to compare against the object property
 * @param idProp A property on the object that contains the value
 */
export function _removeRangeByProp<T>(
  originals: Maybe<ImmutableArray<T>>, 
  value: unknown | unknown[], 
  prop: Prop<Immutable<T>>): Immutable<T>[] {       
    if(!originals?.length) return []; //If initial array empty, just return empty array

    const copy = originals.slice();   

    if(typeof value !== "object")
        for(let i = 0; i < copy.length; i++) 	
            if(copy[i][prop] === value) copy.splice(i, 1);  
    else {
        const valueMap  = _convertArrayToObject(<unknown[]> value)
        for(let i = 0; i < copy.length; i++) 	
            if(valueMap[<string> copy[i][prop]]) copy.splice(i, 1);  
    }

    return copy;
}