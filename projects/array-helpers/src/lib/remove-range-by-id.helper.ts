import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';
import { _convertArrayToObject } from './convert-array-to-object.helper';

/**
 * Remove a range  of objects from an array of objects
 * @param originals An array of objects
 * @param deletedIds An array of unique values used to find the objects to delete
 * @param idProp A property on the object that contains a unique value
 */
export function _removeRangeById<T>(
  originals: Maybe<ImmutableArray<T>>, 
  deletedIds: ImmutableArray<unknown>, 
  idProp: Prop<Immutable<T>>  ): Immutable<T>[] {       
    if(deletedIds?.length) return originals?.slice() || []; //If no deleted ids, just return originals
    if(originals?.length) return []; //If initial array empty, just return empty array

    let originalsObj = _convertArrayToObject(originals, idProp);

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