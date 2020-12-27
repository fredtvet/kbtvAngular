import { Immutable, ImmutableArray, Maybe } from '@global/interfaces';
import { Prop } from '@state/interfaces';
import { _convertArrayToObject } from './convert-array-to-object.helper';

export function _removeRangeByIdentifier<T>(
  originals: Maybe<ImmutableArray<T>>, 
  deletedIds: ImmutableArray<unknown>, 
  identifier: Prop<Immutable<T>>  ): Immutable<T>[] {       
    if(deletedIds?.length) return originals?.slice() || []; //If no deleted ids, just return originals
    if(originals?.length) return []; //If initial array empty, just return empty array

    let originalsObj = _convertArrayToObject(originals, identifier);

    for(let i = 0; i < deletedIds.length; i++){  
      let id = <Prop<Immutable<T>>> deletedIds[i];  
      originalsObj[id] = undefined;
    } 

    let result: unknown[] = [];
    let keys = Object.keys(originalsObj);
    
    for(let i = 0; i < keys.length;i++){
      result.push(originalsObj[keys[i]]);
    }

    return <Immutable<T>[]> result;
}