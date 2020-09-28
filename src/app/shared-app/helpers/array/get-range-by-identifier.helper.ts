import { _convertArrayToObject } from './convert-array-to-object.helper';

export function _getRangeByIdentifier<T>(originals: T[], ids: any[], identifier: string): T[]{       
    if(!ids || ids.length == 0) return originals.slice(); //If no deleted ids, just return originals
    if(!originals || originals.length == 0) return []; //If initial array empty, just return empty array

    let originalsObj = _convertArrayToObject(originals, identifier);
    let result: T[] = [];
    for(let i = 0; i < ids.length; i++){  
      let match = originalsObj[ids[i]];
      if(match) result.push(match)
    } 

    return result;
}