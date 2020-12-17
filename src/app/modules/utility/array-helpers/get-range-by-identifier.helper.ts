import { Immutable, ImmutableArray, Maybe } from '@global/interfaces';
import { Prop } from '@state/interfaces';
import { _convertArrayToObject } from './convert-array-to-object.helper';

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