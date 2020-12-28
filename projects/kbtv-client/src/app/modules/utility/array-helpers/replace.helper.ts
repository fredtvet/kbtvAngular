import { ImmutableArray, Immutable, Maybe, Prop } from 'global-types';

export function _replace<T>(
  array: Maybe<ImmutableArray<T>>, 
  obj: Immutable<T>, 
  id: unknown, 
  identifier: Prop<Immutable<T>>): Immutable<T>[]{
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