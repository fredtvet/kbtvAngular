import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { _convertArrayToObject } from './convert-array-to-object.helper';

export function _getRangeByIdentifier<T>(
  originals: ImmutableArray<T>, 
  ids: ImmutableArray<unknown>, 
  identifier: string): Immutable<T>[]{       
    if(!originals?.length) return []; //If initial array empty, just return empty array  
    if(!ids?.length) return originals.slice(); //If no deleted ids, just return originals
    

    let originalsObj = _convertArrayToObject(originals, identifier);
    let result: Immutable<T>[] = [];

    for(let i = 0; i < ids.length; i++){  
      let match = originalsObj[ids[i] as string];
      if(match) result.push(match)
    } 

    return result;
}