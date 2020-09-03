import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArrayHelperService {

  constructor() { console.log("ArrayHelperService"); }

  find<T>(array: T[], value: any, identifier: string){
    if(!array || array.length == 0 || !value) return undefined;
    let result: T;
    for(let i = 0; i < array.length; i++){
      let obj = array[i];
      if(obj[identifier] === value){
        result = {...obj};
        break;
      };
    }
    return result;
  }

  add<T>(array: T[], value: T): T[]{
    if(!array || array.length == 0) return array;
    let arr = array.slice();
    arr.unshift(value);
    return arr;
  }

  update<T>(array: T[], updatedObj: Partial<T>, identifier: string){
    if(!array || array.length == 0) return array;
    let arr = array.slice();
    for(let i = 0; i < arr.length; i++){
      let obj = arr[i];
      if(obj[identifier] === updatedObj[identifier]){
        arr[i] = {...Object.assign(obj, updatedObj)};
        break;
      }
    }
    return arr;
  }

  replace<T>(array: T[], obj: T, id: any, identifier: string){
    if(!array || array.length == 0) return array;
    let arr = array.slice();
    for(let i = 0; i < arr.length; i++){
      let currObj = arr[i];
      if(currObj[identifier] === id){
        arr[i] = obj;
        break;
      }
    }
    return arr;
  }

  addOrUpdateRange<T>(originals: T[], newEntities: T[], identifier: string): T[]{       
    if(!newEntities || newEntities.length == 0) return originals?.slice(); //If no entities, just return current val
    if(!originals || originals.length == 0) return newEntities.slice(); //If initial array empty, just return empty array

    let originalsObj = this.convertArrayToObject(originals, 'id');

    for(let i = 0; i<newEntities.length; i++){  
      let newObj = newEntities[i];
      const itemKey = identifier ? newObj[identifier] : newObj; //Use identifier as key else obj
      let existingObj = originalsObj[itemKey]; //Grab existing obj
      if(existingObj) Object.assign(existingObj, newObj); //If obj exist, update it with new obj
      else originalsObj[itemKey] = newObj;    
    } 

    let result: T[] = [];
    let keys = Object.keys(originalsObj);
    for(let i = 0; i < keys.length;i++){
      result.push(originalsObj[keys[i]]);
    }
    return result;
  }

  filter<T>(originals: T[], expression: (value: T, index?: number, Array?: any[]) => boolean): T[]{
    if(!originals || originals.length == 0) return undefined;
    let filtered = [];
    for(let i = 0; i < originals.length; i++){
      let obj = originals[i];
      if(expression(obj)) filtered.push(obj);
    }
    return filtered;
  }

  removeRangeByIdentifier<T>(originals: T[], deletedIds: any[], identifier: string): T[]{       
    if(!deletedIds || deletedIds.length == 0) return originals?.slice(); //If no deleted ids, just return originals
    if(!originals || originals.length == 0) return []; //If initial array empty, just return empty array

    let originalsObj = this.convertArrayToObject(originals, identifier);

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

  removeByIdentifier<T>(originals: T[], deletedId: any, identifier: string): T[]{       
    if(!originals || originals.length == 0) return []; //If initial array empty, just return empty array

    let arr2 = originals.slice();
    for(var i = 0; i<arr2.length;i++){
      if(arr2[i][identifier] === deletedId){ 
        arr2.splice(i, 1);
        break;        	          
      }      
    };

    return arr2;
  }

  getRangeByIdentifier<T>(originals: T[], ids: any[], identifier: string): T[]{       
    if(!ids || ids.length == 0) return originals.slice(); //If no deleted ids, just return originals
    if(!originals || originals.length == 0) return []; //If initial array empty, just return empty array

    let originalsObj = this.convertArrayToObject(originals, identifier);
    let result: T[] = [];
    for(let i = 0; i < ids.length; i++){  
      let match = originalsObj[ids[i]];
      if(match) result.push(match)
    } 

    return result;
  }

  convertArrayToObject = <T>(array: T[], key?: string): { [key: string]: T } => {
    if(!array || array.length == 0) return {};
    const result = {}; 
    for(var i = 0; i < array.length; i++){
      const entity = array[i];
      result[key ? entity[key] : entity] = entity
    }
    return result;
  }

  groupBy = <T>(array: T[], key: string): {[key: string] : T[]} => {
    if(!array || array.length == 0) return {};
    const result = {}; 
    for(var i = 0; i < array.length; i++){
      const entity = array[i];
      (result[entity[key]] = result[entity[key]] || []).push(entity);
    }
    return result
  }

}
