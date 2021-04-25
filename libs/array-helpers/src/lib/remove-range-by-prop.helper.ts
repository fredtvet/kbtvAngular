import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';

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
    let delCount = 0;
    if(!Array.isArray(value))
        for(let i = 0; i < originals.length; i++) {
            const item = copy[i];	
            if(item && item[prop] === value){ 
                copy.splice(i - delCount, 1);
                delCount = delCount + 1;
            } 
        } 
    else {
        for(let i = 0; i < originals.length; i++) 	{
            const item = copy[i];	
            if(item && value.indexOf(item[prop]) !== -1){              
                copy.splice(i - delCount, 1);
                delCount = delCount + 1;
            }
        }
    } 
    return copy;
}