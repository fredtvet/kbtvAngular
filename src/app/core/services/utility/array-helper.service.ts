import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArrayHelperService {

  constructor() {}

  find<T>(array: T[], value: any, identifier: string){
    if(this.isEmptyArray(array)) return undefined;
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
    let arr = array.slice();
    arr.unshift(value);
    return arr;
  }

  update<T>(array: T[], updatedObj: T, identifier: string){
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

  addOrUpdateRange<T>(originals: T[], newEntities: T[], identifier: string): T[]{       
    if(this.isEmptyArray(newEntities)) return originals.slice(); //If no entities, just return current val
    if(this.isEmptyArray(originals)) return newEntities.slice(); //If initial array empty, just return empty array

    let originalsObj = this.convertArrayToObject(originals, 'id');
    let originalsLength = originals.length;
    let counter = -1; //Keeping track of last index in array

    for(let i = 0; i<newEntities.length; i++){  
      let newObj = newEntities[i];
      const itemKey = identifier ? newObj[identifier] : newObj; //Use identifier as key else obj
      let existingObj = originalsObj[itemKey]; //Grab existing obj
      if(existingObj && existingObj != null) Object.assign(existingObj, newObj); //If obj exist, update it with new obj
      else {
        originalsObj[originalsLength + counter] = newObj;
        counter++;
       } //If no obj exist, add obj to end of array 
    } 

    let result: T[] = [];
    let keys = Object.keys(originalsObj);
    for(let i = 0; i < keys.length;i++){
      result.push(originalsObj[keys[i]]);
    }
    return result;
}

  removeRangeByIdentifier<T>(originals: T[], deletedIds: any[], identifier: string): T[]{       
    if(this.isEmptyArray(deletedIds)) return originals.slice(); //If no deleted ids, just return originals
    if(this.isEmptyArray(originals)) return []; //If initial array empty, just return empty array

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
    if(this.isEmptyArray(originals)) return []; //If initial array empty, just return empty array

    let arr2 = originals.slice();
    for(var i = 0; i<arr2.length;i++){
      if(arr2[i][identifier] === deletedId){ 
        arr2.splice(i, 1);
        break;        	          
      }      
    };

    console.log(arr2);
    return arr2;
  }

  getRangeByIdentifier<T>(originals: T[], ids: any[], identifier: string): T[]{       
    if(this.isEmptyArray(ids)) return originals.slice(); //If no deleted ids, just return originals
    if(this.isEmptyArray(originals)) return []; //If initial array empty, just return empty array

    let originalsObj = this.convertArrayToObject(originals, identifier);
    let result: T[] = [];
    for(let i = 0; i < ids.length; i++){  
      let match = originalsObj[ids[i]];
      if(match) result.push(match)
    } 

    return result;
  }


  convertArrayToObject = (array: any[], key?: string) => {
    let arr = array.reduce((obj, item) => {
        const itemKey = key ? item[key] : item;
        obj[itemKey] = item;
        return obj;
    }, {});
    return arr;
  };

  isEmptyArray = (arr: any[]) => !arr || arr === null || arr.length === 0

}
