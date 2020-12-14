import { ImmutableArray, Immutable } from '@immutable/interfaces';

export function _replace<T>(array: ImmutableArray<T>, obj: Immutable<T>, id: any, identifier: string): Immutable<T>[]{
    if(!array?.length) return [];
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