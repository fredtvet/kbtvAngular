import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';
import { _convertArrayToObject } from './convert-array-to-object.helper';

export function _addOrUpdateRange<T>(
    originals: Maybe<ImmutableArray<T>>, 
    newEntities: Maybe<ImmutableArray<T>>, 
    identifier: Prop<Immutable<T>>): Immutable<T>[]{   

    if(!newEntities?.length) return originals?.slice() || []; //If no entities, just return current val
    if(!originals?.length) return newEntities.slice(); //If initial array empty, just return empty array

    let originalsObj = _convertArrayToObject(originals, identifier);

    for(let i = 0; i < newEntities.length; i++){  
      let newObj = newEntities[i];
      const itemKey = identifier ? newObj[identifier] : newObj; //Use identifier as key else obj
      let existingObj = originalsObj[<string> itemKey]; //Grab existing obj
      if(existingObj) originalsObj[<string> itemKey] = {...existingObj, ...newObj}; //If obj exist, update it with new obj
      else originalsObj[<string> itemKey] = newObj;    
    } 

    let result: Immutable<T>[] = [];
    let keys = Object.keys(originalsObj);
    
    for(let i = 0; i < keys.length;i++){
      result.push(<Immutable<T>> originalsObj[keys[i]]);
    }

    return result;
}