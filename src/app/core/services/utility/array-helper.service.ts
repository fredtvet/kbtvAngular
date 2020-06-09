import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArrayHelperService {

  constructor() {}

  convertArrayToObject = (array: any[], key?: string) => {
    console.time('convertArrayToObject')
    let arr = array.reduce((obj, item) => {
        const itemKey = key ? item[key] : item;
        obj[item[key]] = item;
        return obj;
    }, {});
    console.timeEnd('convertArrayToObject');
    return arr;
  };

  addOrUpdateRange<T>(originals: T[], newEntities: T[], identifier: string): T[]{       
       if(this.isEmptyArray(newEntities)) return originals.slice(); //If no entities, just return current val
       if(this.isEmptyArray(originals)) return newEntities.slice(); //If initial array empty, just return entities

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

       return Object.values(originalsObj) as T[]; 
  }

  removeRangeByIdentifier<T>(originals: T[], deletedIds: any[], identifier: string): T[]{       
    if(this.isEmptyArray(deletedIds)) return originals.slice(); //If no deleted ids, just return originals
    if(this.isEmptyArray(originals)) return []; //If initial array empty, just return entities

    let originalsObj = this.convertArrayToObject(originals, identifier);

    for(let i = 0; i < deletedIds.length; i++){  
      let id = deletedIds[i];  
      delete originalsObj[id];
    } 

    return Object.values(originalsObj) as T[];;
}

  isEmptyArray = (arr: any[]) => !arr || arr === null || arr.length === 0

}
