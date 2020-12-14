import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _update<T>(array: ImmutableArray<T>, updatedObj: Partial<Immutable<T>>, identifier: string): Immutable<T>[] {
    if(!array || array.length == 0) return [];
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