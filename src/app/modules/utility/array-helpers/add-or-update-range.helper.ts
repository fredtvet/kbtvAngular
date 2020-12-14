import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { _convertArrayToObject } from './convert-array-to-object.helper';

export function _addOrUpdateRange<T>(
    originals: ImmutableArray<T>, 
    newEntities: ImmutableArray<T>, 
    identifier: string): Immutable<T>[]{   
          
    if(!newEntities?.length) return originals?.slice(); //If no entities, just return current val
    if(!originals?.length) return newEntities.slice(); //If initial array empty, just return empty array

    let originalsObj = _convertArrayToObject(originals, 'id');

    for(let i = 0; i<newEntities.length; i++){  
      let newObj = newEntities[i];
      const itemKey = identifier ? newObj[identifier] : newObj; //Use identifier as key else obj
      let existingObj = originalsObj[itemKey]; //Grab existing obj
      if(existingObj) Object.assign(existingObj, newObj); //If obj exist, update it with new obj
      else originalsObj[itemKey] = newObj;    
    } 

    let result: Immutable<T>[] = [];
    let keys = Object.keys(originalsObj);
    
    for(let i = 0; i < keys.length;i++){
      result.push(originalsObj[keys[i]]);
    }

    return result;
}