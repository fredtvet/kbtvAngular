import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';
import { _convertArrayToObject } from './convert-array-to-object.helper';

/**
 * Get a range of objects
 * @param originals An array of objects 
 * @param ids An array of unique values that identify the objects
 * @param identifier A property on the object that contains the unique value
 */
export function _getRangeByIdentifier<T>(
  originals: Maybe<ImmutableArray<T>>, 
  ids: ImmutableArray<unknown>, 
  identifier: Prop<Immutable<T>>): Immutable<T>[]{       
    if(!originals?.length) return []; //If initial array empty, just return empty array  
    if(!ids?.length) return originals.slice(); //If no deleted ids, just return originals
    
    let originalsObj = _convertArrayToObject<T>(originals, identifier);
    let result: Immutable<T>[] = [];

    for(let i = 0; i < ids.length; i++){  
      let match = originalsObj[ids[i] as string];
      if(match) result.push(match)
    } 

    return result;
}