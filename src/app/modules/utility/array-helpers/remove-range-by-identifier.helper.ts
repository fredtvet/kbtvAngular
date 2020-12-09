import { _convertArrayToObject } from './convert-array-to-object.helper';

export function _removeRangeByIdentifier<T>(originals: T[], deletedIds: any[], identifier: string): T[]{       
    if(!deletedIds || deletedIds.length == 0) return originals?.slice(); //If no deleted ids, just return originals
    if(!originals || originals.length == 0) return []; //If initial array empty, just return empty array

    let originalsObj = _convertArrayToObject(originals, identifier);

    for(let i = 0; i < deletedIds.length; i++){  
      let id = deletedIds[i];  
      delete originalsObj[id];
    } 

    let result: T[] = [];
    let keys = Object.keys(originalsObj);
    for(let i = 0; i < keys.length;i++){
      result.push(originalsObj[keys[i]]);
    }
    return result;
}