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
    if(!deletedIds?.length) return originals?.slice() || []; //If no deleted ids, just return originals
    if(!originals?.length) return []; //If initial array empty, just return empty array
    
    const idMap = _convertArrayToObject(deletedIds);
    const copy = originals.slice();

    let delLength = deletedIds.length;
    
    for(let i = 0; i < copy.length; i++){  	
      let entity = copy[i]; 
           
      if(idMap[<string>entity[idProp]]){
        copy.splice(i, 1);
        delLength = delLength - 1;
      }
      
      if(delLength === 0) break;
    }

    return copy;
}